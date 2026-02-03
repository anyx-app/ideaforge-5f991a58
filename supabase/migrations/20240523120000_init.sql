SET search_path TO proj_c6a65f07;

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Helper function for auth user id (to avoid auth.uid() dependency issues in shared schema)
CREATE OR REPLACE FUNCTION current_user_id() RETURNS text AS $$
    SELECT current_setting('request.jwt.claims', true)::json->>'sub';
$$ LANGUAGE sql STABLE;

-- 1. profiles
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL, -- Links to auth.users implicitly
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);

-- 2. ideas
CREATE TABLE IF NOT EXISTS ideas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL, -- Owner
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    target_market TEXT,
    problem_statement TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_ideas_user_id ON ideas(user_id);

-- 3. analyses
CREATE TABLE IF NOT EXISTS analyses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    idea_id UUID NOT NULL REFERENCES ideas(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'pending',
    overall_score INTEGER,
    market_analysis_summary TEXT,
    market_size_details JSONB,
    market_trends TEXT[],
    key_insights TEXT[],
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. competitors
CREATE TABLE IF NOT EXISTS competitors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    analysis_id UUID NOT NULL REFERENCES analyses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    website_url TEXT,
    strengths TEXT,
    weaknesses TEXT,
    differentiation_factor TEXT
);

-- 5. validation_metrics
CREATE TABLE IF NOT EXISTS validation_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    analysis_id UUID NOT NULL REFERENCES analyses(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    score INTEGER,
    reasoning TEXT
);

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE validation_metrics ENABLE ROW LEVEL SECURITY;

-- Policies

-- Profiles
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (user_id::text = current_user_id());

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (user_id::text = current_user_id());
    
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (user_id::text = current_user_id());

-- Ideas
DROP POLICY IF EXISTS "Users can view own ideas" ON ideas;
CREATE POLICY "Users can view own ideas" ON ideas
    FOR SELECT USING (user_id::text = current_user_id());

DROP POLICY IF EXISTS "Users can insert own ideas" ON ideas;
CREATE POLICY "Users can insert own ideas" ON ideas
    FOR INSERT WITH CHECK (user_id::text = current_user_id());

DROP POLICY IF EXISTS "Users can update own ideas" ON ideas;
CREATE POLICY "Users can update own ideas" ON ideas
    FOR UPDATE USING (user_id::text = current_user_id());

DROP POLICY IF EXISTS "Users can delete own ideas" ON ideas;
CREATE POLICY "Users can delete own ideas" ON ideas
    FOR DELETE USING (user_id::text = current_user_id());

-- Analyses
-- Users can view analyses linked to their ideas
DROP POLICY IF EXISTS "Users can view analyses of own ideas" ON analyses;
CREATE POLICY "Users can view analyses of own ideas" ON analyses
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM ideas
            WHERE ideas.id = analyses.idea_id
            AND ideas.user_id::text = current_user_id()
        )
    );

-- Competitors
DROP POLICY IF EXISTS "Users can view competitors of own ideas" ON competitors;
CREATE POLICY "Users can view competitors of own ideas" ON competitors
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM analyses
            JOIN ideas ON ideas.id = analyses.idea_id
            WHERE analyses.id = competitors.analysis_id
            AND ideas.user_id::text = current_user_id()
        )
    );

-- Validation Metrics
DROP POLICY IF EXISTS "Users can view metrics of own ideas" ON validation_metrics;
CREATE POLICY "Users can view metrics of own ideas" ON validation_metrics
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM analyses
            JOIN ideas ON ideas.id = analyses.idea_id
            WHERE analyses.id = validation_metrics.analysis_id
            AND ideas.user_id::text = current_user_id()
        )
    );

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS update_ideas_updated_at ON ideas;
CREATE TRIGGER update_ideas_updated_at
    BEFORE UPDATE ON ideas
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

