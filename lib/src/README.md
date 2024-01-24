# The Modules Directory

This README aims at desribing the current structure of the modules directory. It is very much work in progress. These modules could very well be extracted out as its own github repos, since they are isolated components by design.

## A Module

A module is a self-contained organism responsible for it's own domain model, services, entrypoints, tests and so forth.

## The modules

We currently have

- **Writer** - Takes input data and produces a narration script. Can be chat logs, image transcriptions etc.
- **Producer** - Converts a narration script into a video template.
- **Remotion** - Contains Remotion carousel templates. These takes a zod schema as input.
