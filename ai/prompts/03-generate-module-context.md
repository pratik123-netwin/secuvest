# Prompt: Generate Module Context

We have completed development of a module in this project.

Module Name: <module-name>

Your task is to analyze the implemented module and generate a module context document.

---

## Module Analysis Checklist

While analyzing the module, review the following implementation areas if available:

1. API routes
2. Controllers
3. Services or business logic classes
4. Database migrations
5. Models and relationships
6. Request validation classes
7. Background jobs or events
8. Integrations with other modules

---

## Information to Extract

Based on the analysis, identify:

1. Module purpose
2. API endpoints exposed by the module
3. Database tables used by the module
4. Workflows handled by the module
5. Dependencies or integrations with other modules

If the implementation is not fully visible, request relevant files such as:

* controllers
* routes
* models
* migrations
* services

---

## Output Requirements

Generate the documentation using the structure defined in:

ai/module-context-template.md

Follow the template structure exactly.

Do not include implementation code.

---

## Output Location

The final output must be suitable for saving in:

ai-context/<module-name>.md

Example:

ai-context/user.md
