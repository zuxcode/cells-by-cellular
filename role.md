Here's a **Role-Based Access Control (RBAC) Permissions Matrix** for the **Hospitality Management System (HMS)**. This table defines **what each role can do** across different modules.

---

### **🛠️ Permissions Matrix**

| **Module**                     | **Super Admin** | **General Manager** | **Finance Manager** | **IT Admin**        | **Department Managers** | **Staff (Reception, Waiters, etc.)** |
| ------------------------------ | --------------- | ------------------- | ------------------- | ------------------- | ----------------------- | ------------------------------------ |
| **User Management**            | ✅ Full Access  | ✅ View & Edit      | ❌ No Access        | ✅ Manage Logins    | ✅ Manage Own Dept      | ❌ No Access                         |
| **Roles & Permissions**        | ✅ Full Control | ❌ No Access        | ❌ No Access        | ✅ Technical Access | ❌ No Access            | ❌ No Access                         |
| **Organization Settings**      | ✅ Full Control | ✅ View Only        | ❌ No Access        | ✅ Manage System    | ❌ No Access            | ❌ No Access                         |
| **Financial Management**       | ✅ Full Access  | ✅ View Reports     | ✅ Full Access      | ❌ No Access        | ❌ No Access            | ❌ No Access                         |
| **Inventory Management**       | ✅ Full Access  | ✅ View Reports     | ✅ View Costs       | ❌ No Access        | ✅ Manage Own Dept      | ❌ No Access                         |
| **Guest Check-in/Check-out**   | ❌ No Access    | ✅ View Reports     | ❌ No Access        | ❌ No Access        | ✅ Manage Staff         | ✅ Perform Check-ins                 |
| **Room & Booking Management**  | ✅ Full Access  | ✅ View Reports     | ❌ No Access        | ❌ No Access        | ✅ Manage Staff         | ✅ Handle Bookings                   |
| **Restaurant Orders**          | ✅ View Reports | ✅ View Reports     | ❌ No Access        | ❌ No Access        | ✅ Manage Staff         | ✅ Take Orders                       |
| **Kitchen & Food Prep**        | ❌ No Access    | ✅ View Reports     | ❌ No Access        | ❌ No Access        | ✅ Manage Staff         | ✅ Prepare Food                      |
| **Event & Banquet Management** | ✅ Full Access  | ✅ Manage           | ❌ No Access        | ❌ No Access        | ✅ Manage Own Events    | ✅ Execute Event Tasks               |
| **Procurement & Suppliers**    | ✅ Full Access  | ✅ View Reports     | ✅ View Reports     | ❌ No Access        | ✅ Request Supplies     | ❌ No Access                         |
| **HR & Payroll**               | ✅ Full Access  | ✅ View Reports     | ✅ Manage Payroll   | ❌ No Access        | ✅ Manage Staff         | ❌ No Access                         |
| **Security & Access Control**  | ✅ Full Access  | ✅ View Reports     | ❌ No Access        | ✅ Manage Security  | ❌ No Access            | ❌ No Access                         |
| **Marketing & Promotions**     | ✅ Full Access  | ✅ View Reports     | ❌ No Access        | ❌ No Access        | ✅ Manage Own Campaigns | ❌ No Access                         |

---

### **🎯 Key Role Permissions**

✅ = Full Access  
✅ View = Can view but not modify  
✅ Manage = Can modify within assigned scope  
❌ No Access = Cannot access

---

### **🔒 How to Implement in Supabase**

1. **Create a `roles` table** with permission settings stored as JSONB.
2. **Use Row-Level Security (RLS)** to restrict access.
3. **Assign users to roles** via a `user_roles` table.
4. **Use Postgres policies** to enforce permissions.

Would you like a **Supabase SQL setup for RBAC?** 🚀
