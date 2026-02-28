# Project Management Tool (WIP)

### This project is planned to be completed, at the latest, before the end of March. 

A full-stack project management tool built with React and Express.

(Soon to be) features:
1. Project management
2. Commenting
3. Role-based access
4. User invitation

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Tech Stack](#tech-stack)
4. [Future Plans](#todo)
5. [License](#license)

## Installation
```
git clone https://github.com/logicalPanda2/react-express-fancy-todo-project.git
```

## Usage
TBA

## Tech Stack
- React with React Router
- Express
- Tailwind CSS
- TypeScript

## TODO
1. Finish API endpoints for projects, tasks, and comments
2. Delete redundant files in backend
3. Integrate auth with frontend
4. Enforce application level validation logic for:
    - at least one task per project
    - non empty project title and description
    - non empty task title
    - non empty comments
5. Enable editing task status and removing task on CreateEdit page
6. Implement URL parameters in frontend
7. Improve architecture for taskTitles on CreateEdit page to be more robust
9. Move scattered frontend types to declaration file
10. Extract reusable components: buttons, inputs, forms, cards, rows, etc.
11. Extract hooks, primarily CRUD hooks 
12. Apply a more colorful color palette
13. Add shadows, transitions and other details for additional polish 
14. Add confirmation dialog box for deletion
15. Add soft deletion and undo toasts for all delete actions
16. Various other small details I most likely have missed but will find out in the process of building &semi;&rpar;

## License
<a href="./LICENSE.txt">MIT License</a>
