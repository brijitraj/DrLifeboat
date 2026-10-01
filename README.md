# Dr. Lifeboat - MERN

## Setup
1. Backend
   cd backend && npm install
   Edit .env (Mongo URI, JWT secret, Razorpay test keys)
   npm run seed     # creates superAdmin + 3 sample courses (entry / medium / advanced)
   npm run dev      # http://localhost:5000
2. Frontend
   cd frontend && npm install && npm run dev   # http://localhost:5173

## Default SuperAdmin (change in .env before seeding)
superadmin@drlifeboat.com / Super@123

## Roles
- student: signs up on /signup, subscribes to courses via Razorpay, sees /dashboard
- admin: created by superAdmin, manages courses, views students and payments (/admin)
- superAdmin: everything admin can do + create/remove admins (/super-admin)
