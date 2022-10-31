# DiceDB test for ioredis driver

## How to setup?

- Spin up a DiceDB instance at ```127.0.0.1:7379```
- Spin up a Redis instance at ```127.0.0.1:6379```
- Setup this repository via below command line
```bash
npm install
```
- Configure KeyLimit in ``source_root_dicedb/config/main.go`` before running the test
```go
var KeysLimit int = 300
```

## How to run test?

**For DiceDB**
```bash
npm run dice-test
```
**For Redis -**

```bash
npm run redis-test
```

**To clean js files**
```bash
npm run clean
```