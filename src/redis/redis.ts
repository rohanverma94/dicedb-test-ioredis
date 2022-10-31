import { assert } from 'console';
import Redis from 'ioredis';

const redis = new Redis({
  port: 6379,
  host: '127.0.0.1',
});

const valRange = 300; //insert string keys from "0" to "299"

(async () => {

  // Execute set key1 1, set key2 2, set key3 3........set key299 299
  // Get insertion time in ms
  let now = Date.now();
  let promises = [];
  for (let i = 0; i < valRange; ++i) {
    promises.push(redis.set("key" + i, String(i)));
  }
  await Promise.all(promises);

  console.log("\nFor %d SET ops it took %dms\n", valRange, Date.now() - now);
  promises = [];

  //Execute get key1, get key2, get key3........get key299
  //Async call fetches the value asynchronously and checks the validity of keys via assertion
  now = Date.now();
  for (let i = 0; i < valRange; ++i) {
    promises.push(redis.get("key" + i).then(value => {
      assert(value == String(i), "key%d", i);
    }));
  }
  await Promise.all(promises);

  console.log("\nFor %d GET ops it took %dms\n", valRange, Date.now() - now);

  redis.quit();
})();