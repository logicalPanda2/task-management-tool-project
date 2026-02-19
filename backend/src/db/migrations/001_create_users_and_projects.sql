BEGIN;

CREATE TYPE project_task_status AS ENUM (
    'COMPLETE',
    'INCOMPLETE'
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status project_task_status DEFAULT 'INCOMPLETE',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_projects (
    user_id INTEGER NOT NULL,
    project_id UUID NOT NULL,
    user_role VARCHAR(100) NOT NULL,

    PRIMARY KEY (user_id, project_id),

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE
);

CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    status project_task_status DEFAULT 'INCOMPLETE',
    project_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),

    FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE
);

COMMIT;
