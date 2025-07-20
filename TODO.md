# TODOs

## 🛠 Error Handling
- [ ] Replace all `unwrap()` and `expect()` calls with proper error handling using `Result`, `?`, or graceful fallbacks. This includes:
  - File IO (`read_to_string`, `write`, etc.)
  - Mutex locks (`.lock()`)
  - JSON deserialization
  - UUID generation (if guarded by feature flags)

_For now, unwraps were used to move quickly during prototyping._