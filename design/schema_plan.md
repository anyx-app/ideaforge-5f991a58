# Schema Plan - IdeaForge

## Overview
This schema supports the IdeaForge application, enabling users to store startup ideas and receive detailed market analysis, competitor research, and validation scores.

## Tables

### 1. `profiles`
Extends the default Supabase `auth.users` table to store application-specific user data.
- **id** `uuid` (PK) - References `auth.users(id)` with `ON DELETE CASCADE`.
- **full_name** `text` - Display name of the user.
- **avatar_url** `text` - URL to user avatar image.
- **created_at** `timestamptz` - Default `now()`.
- **updated_at** `timestamptz` - Default `now()`.

### 2. `ideas`
Stores the core input data for a user's startup concept.
- **id** `uuid` (PK) - Default `gen_random_uuid()`.
- **user_id** `uuid` (FK) - References `profiles(id)`.
- **title** `text` - Short name of the idea.
- **description** `text` - Detailed explanation of the concept.
- **target_market** `text` - User-defined target audience or market segment.
- **problem_statement** `text` - The specific problem the idea solves.
- **created_at** `timestamptz` - Default `now()`.
- **updated_at** `timestamptz` - Default `now()`.

### 3. `analyses`
Stores the result of the AI/algorithm analysis for a specific idea. One idea can potentially have multiple analyses (e.g. re-runs), but typically 1:1 or 1:Many.
- **id** `uuid` (PK) - Default `gen_random_uuid()`.
- **idea_id** `uuid` (FK) - References `ideas(id)` with `ON DELETE CASCADE`.
- **status** `text` - Enum-like string: 'pending', 'processing', 'completed', 'failed'. Default 'pending'.
- **overall_score** `integer` - Calculated viability score (0-100).
- **market_analysis_summary** `text` - High-level summary of the market research.
- **market_size_details** `jsonb` - Structured data regarding TAM/SAM/SOM.
- **market_trends** `text[]` - List of relevant current trends.
- **key_insights** `text[]` - Bullet points of actionable advice.
- **created_at** `timestamptz` - Default `now()`.

### 4. `competitors`
Stores identified competitors found during the analysis phase.
- **id** `uuid` (PK) - Default `gen_random_uuid()`.
- **analysis_id** `uuid` (FK) - References `analyses(id)` with `ON DELETE CASCADE`.
- **name** `text` - Name of the competitor.
- **website_url** `text` - URL (optional).
- **strengths** `text` - Analysis of what they do well.
- **weaknesses** `text` - Analysis of where they lack.
- **differentiation_factor** `text` - How our idea compares.

### 5. `validation_metrics`
Detailed breakdown of the scoring to allow granular feedback (e.g., Feasibility vs. Desirability).
- **id** `uuid` (PK) - Default `gen_random_uuid()`.
- **analysis_id** `uuid` (FK) - References `analyses(id)` with `ON DELETE CASCADE`.
- **category** `text` - e.g., "Market Demand", "Technical Feasibility", "Competition".
- **score** `integer` - Score for this specific category (0-10).
- **reasoning** `text` - Explanation for why this score was given.

## Security Policies (RLS)

- **profiles**: 
  - Users can read/update their own profile.
  - Public read access might be needed for avatars (TBD), strictly `auth.uid() = id` for now.
- **ideas**:
  - Users can CRUD their own ideas (`auth.uid() = user_id`).
- **analyses**:
  - Users can read analyses linked to their ideas.
  - System (service role) writes analyses.
- **competitors**:
  - Inherit access via `analyses` -> `ideas`.
- **validation_metrics**:
  - Inherit access via `analyses` -> `ideas`.

## Relationships
- `profiles` 1 : M `ideas`
- `ideas` 1 : M `analyses` (Often 1:1 in MVP)
- `analyses` 1 : M `competitors`
- `analyses` 1 : M `validation_metrics`
