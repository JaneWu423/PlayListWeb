const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'web';

// List of song names and singers
const curDate = new Date();
const songs = [
    {
        song: "花海",
        singer: "周杰伦",
        lang: "中文",
        user: "admin",
        t_added: curDate,
        like: 1,
        sung: 0,
        tags: ["流行"]
    },
    {
        song: "暗号",
        singer: "周杰伦",
        lang: "中文",
        user: "admin",
        t_added: curDate,
        like: 1,
        sung: 0,
        tags: ["流行"]
    },
    {
        song: "园游会",
        singer: "周杰伦",
        lang: "中文",
        user: "admin",
        t_added: curDate,
        like: 1,
        sung: 0,
        tags: ["流行"]
    },
    {
        song: "爱的飞行日记",
        singer: "周杰伦",
        lang: "中文",
        user: "admin",
        t_added: curDate,
        like: 1,
        sung: 0,
        tags: ["流行"]
    },
    {
        song: "爱情废柴",
        singer: "周杰伦",
        lang: "中文",
        user: "admin",
        t_added: curDate,
        like: 1,
        sung: 0,
        tags: ["流行"]
    },
    {
        song: "她的睫毛",
        singer: "周杰伦",
        lang: "中文",
        user: "admin",
        t_added: curDate,
        like: 1,
        sung: 0,
        tags: ["流行"]
    },
    {
        song: "大笨钟",
        singer: "周杰伦",
        lang: "中文",
        user: "admin",
        t_added: curDate,
        like: 1,
        sung: 0,
        tags: ["流行"]
    },
    {
        song: "一路向北",
        singer: "周杰伦",
        lang: "中文",
        user: "admin",
        t_added: curDate,
        like: 1,
        sung: 0,
        tags: ["流行"]
    },
    {
        song: "夏天",
        lang: "中文",
        user: "admin",
        t_added: curDate,
        like: 1,
        sung: 0,
        tags: ["流行"]
    },
    {
        song: "那么骄傲",
        lang: "中文",
        user: "admin",
        t_added: curDate,
        like: 1,
        sung: 0,
        tags: ["流行"]
    },
    {
        song: "太阳",
        lang: "中文",
        user: "admin",
        t_added: curDate,
        like: 1,
        sung: 0,
        tags: ["流行"]
    },
    {
        song: "逆战",
        singer: "张杰",
        lang: "中文",
        user: "admin",
        t_added: curDate,
        like: 1,
        sung: 0,
        tags: ["流行"]
    },
    {
        song: "虎口脱险",
        lang: "中文",
        user: "admin",
        t_added: curDate,
        like: 1,
        sung: 0,
        tags: ["流行"]
    },
    {
        song: "一万次悲伤",
        singer: "逃跑计划",
        lang: "中文",
        user: "admin",
        t_added: curDate,
        like: 1,
        sung: 0,
        tags: ["流行"]
    },
    {
        song: "嚣张",
        lang: "中文",
        user: "admin",
        t_added: curDate,
        like: 1,
        sung: 0,
        tags: ["流行"]
    },
    {
        song: "我爱他",
        lang: "中文",
        user: "admin",
        t_added: curDate,
        like: 1,
        sung: 0,
        tags: ["流行"]
    },
    {
        song: "苦茶",
        lang: "中文",
        user: "admin",
        t_added: curDate,
        like: 1,
        sung: 0,
        tags: ["流行"]
    },
    {
        song: "春风十里",
        singer: "鹿先森",
        lang: "中文",
        user: "admin",
        t_added: curDate,
        like: 1,
        sung: 0,
        tags: ["流行"]
    },
    {
        song: "夜空中最亮的星",
        singer: "逃跑计划",
        lang: "中文",
        user: "admin",
        t_added: curDate,
        like: 1,
        sung: 0,
        tags: ["流行"]
    },
    {
        song: "想去海边",
        lang: "中文",
        user: "admin",
        t_added: curDate,
        like: 1,
        sung: 0,
        tags:["流行"]
    },
         {
             song: "唯一",
             lang: "中文",
             singer: "告五人",
             user: "admin",
             date_added: cur_date,
             like: 1,
             sung: 0,
             tags: ["流行"],
         },
         {
             song: "圈套",
             singer: "Fine乐团",
             lang: "中文",
             user: "Laura",
             date_added: cur_date,
             like: 1,
             sung: 0,
             tags: ["流行"],
         },
         {
             song: "因为你，所以我",
             singer: "五月天",
             lang: "中文",
             user: "Laura",
             date_added: cur_date,
             like: 1,
             sung: 0,
             tags: ["流行"],
         },
     ]




// Connect to MongoDB
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log('Connected successfully to server');

    const db = client.db(dbName);

    // Select collection
    const collection = db.collection('ktv');

    // Insert data into collection
    collection.insertMany(songs, function(err, result) {
        assert.equal(err, null);
        console.log('Inserted ' + result.insertedCount + ' documents into the collection');
        client.close();
    });
});

    