| Feature              | Runs On                | Use For                                  | Access to Request? | Can Modify Response? | Handles Errors? |
| -------------------- | ---------------------- | ---------------------------------------- | ------------------ | -------------------- | --------------- |
| **Middleware**       | Before route           | Logging, request manipulation            | ✅ Yes             | ❌ No                | ❌ No           |
| **Guard**            | Before handler         | Authorization / access control           | ✅ Yes             | ❌ No                | ❌ No           |
| **Interceptor**      | Before & after handler | Logging, transformation, caching, timing | ✅ Yes             | ✅ Yes               | ⚠️ Limited      |
| **Pipe**             | Before handler         | Validation, transformation of input data | ✅ Yes             | ❌ No                | ⚠️ Some         |
| **Exception Filter** | On error               | Custom error formatting/handling         | ✅ Yes             | ✅ Yes               | ✅ Yes          |

