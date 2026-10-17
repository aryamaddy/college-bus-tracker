# College Bus Tracker

The bus-tracker project is a separate application from the existing `book-translation` project.

## First vertical slice

This first slice is a responsive, status-first frontend prototype for the student and driver flows:

- Student view: active route status, checkpoint progress, waiting counts, and map-style preview.
- Student action: mark yourself as waiting at a checkpoint; counts update locally.
- Driver view: start/end trip controls and GPS-sharing status preview.

The current data is intentionally local mock data. No real GPS, authentication, or backend is connected yet. The next phase will add the Django API, role-based authentication, and real driver location updates.

## Preview

From this folder, serve `frontend` with any static web server, for example:

```bash
python -m http.server 4173 -d frontend
```

Then open <http://localhost:4173>.
