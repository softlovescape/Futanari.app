# Futanari Landing Page - Backend Contracts

## Overview
This document outlines the backend implementation for the futanari landing page. The current implementation is frontend-only with static content and external links.

## Current Implementation Status
- **Frontend**: Fully implemented with React components
- **Backend**: Minimal FastAPI setup with basic endpoints
- **Database**: MongoDB connection established but not utilized
- **Content**: Static image/video URLs from provided assets
- **External Links**: Functional links to lovescape.com

## Mock Data Currently Used
The frontend currently uses hardcoded assets:
- Background videos: 5 MP4 files from uploaded assets
- Gallery images: 8 PNG files from uploaded assets
- All content is statically embedded in React components

## Backend Implementation Plan

### Phase 1: Content Management API
Since this is primarily a landing page with static content, the backend will focus on:

1. **Content Analytics** (Optional)
   - Track page views
   - Track CTA button clicks
   - Track gallery interactions

2. **Contact/Newsletter API** (Future Enhancement)
   - Collect user emails for updates
   - Basic contact form handling

### Phase 2: Database Schema
```javascript
// Analytics Collection
{
  _id: ObjectId,
  event_type: "page_view" | "cta_click" | "gallery_interaction",
  timestamp: Date,
  user_id: String (optional, session-based),
  metadata: {
    button_clicked: String,
    gallery_image_index: Number,
    user_agent: String,
    ip_address: String
  }
}

// Newsletter Collection (Future)
{
  _id: ObjectId,
  email: String,
  subscribed_at: Date,
  status: "active" | "unsubscribed"
}
```

## API Endpoints to Implement

### Analytics Endpoints
```
POST /api/analytics/track
- Track user interactions
- Body: { event_type, metadata }
- Response: { success: true }

GET /api/analytics/stats (Admin only)
- Get basic analytics data
- Response: { page_views, cta_clicks, gallery_interactions }
```

## Frontend Integration Notes
- No changes needed to current frontend implementation
- All external links remain functional as-is
- Optional: Add analytics tracking to button clicks and gallery interactions
- The landing page functions perfectly as a static site

## Decision: Minimal Backend Approach
Given that this is a landing page that redirects to external services (lovescape.com), the backend requirements are minimal. The current static implementation is sufficient and professional.

**Recommendation**: Keep the current implementation as-is since:
1. All functionality works perfectly
2. External links are functional
3. Content is properly displayed
4. No user authentication or complex data management needed
5. The site serves its purpose as a marketing landing page

## Optional Enhancements (Not Required)
If analytics tracking is desired, we can implement basic event tracking. Otherwise, the current frontend-only approach is production-ready.