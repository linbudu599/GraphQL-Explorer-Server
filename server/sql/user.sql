--
-- 由SQLiteStudio v3.2.1 产生的文件 周三 11月 11 11:23:37 2020
--
-- 文本编码：UTF-8
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- 表：user
DROP TABLE IF EXISTS user;

CREATE TABLE user (
    uid            INTEGER  PRIMARY KEY AUTOINCREMENT
                            NOT NULL,
    name           VARCHAR,
    age            INTEGER  DEFAULT (0),
    job            VARCHAR  NOT NULL
                            DEFAULT ('FE'),
    isFool         BOOLEAN  DEFAULT (0),
    registryDate   DATETIME NOT NULL
                            DEFAULT (datetime('now') ),
    lastUpdateDate DATETIME NOT NULL
                            DEFAULT (datetime('now') ),
    CONSTRAINT UQ_065d4d8f3b5adb4a08841eae3c8 UNIQUE (
        name
    )
);

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     155,
                     'wifkhhi',
                     0,
                     'FE',
                     0,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     156,
                     '0ysxn',
                     0,
                     'FE',
                     0,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     157,
                     'nrz2grlh',
                     0,
                     'FE',
                     0,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     158,
                     'nac4j',
                     0,
                     'FE',
                     1,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     159,
                     'i074w3k02',
                     1,
                     'FE',
                     0,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     160,
                     'rjsu',
                     0,
                     'FE',
                     0,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     161,
                     'liwcixv',
                     1,
                     'FE',
                     0,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     162,
                     'khoso',
                     1,
                     'FE',
                     0,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     163,
                     'nyif0mc6h',
                     0,
                     'FE',
                     0,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     164,
                     'vqb5t6vq2',
                     0,
                     'FE',
                     0,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     165,
                     '59zf4da0',
                     1,
                     'FE',
                     1,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     166,
                     '3is491l',
                     0,
                     'FE',
                     0,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     167,
                     '8ybyvn',
                     1,
                     'FE',
                     1,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     168,
                     'rlz5r88v',
                     1,
                     'FE',
                     1,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     169,
                     '1sjp',
                     0,
                     'FE',
                     0,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     170,
                     '4ez44k',
                     0,
                     'FE',
                     0,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     171,
                     'bxgb',
                     0,
                     'FE',
                     1,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     172,
                     '03c7e86r',
                     0,
                     'FE',
                     0,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     173,
                     'qqk01dr5',
                     0,
                     'FE',
                     0,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     174,
                     '32euz',
                     0,
                     'FE',
                     0,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     175,
                     'xcv2pz',
                     0,
                     'FE',
                     1,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     176,
                     'etxhpw2',
                     0,
                     'FE',
                     0,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     177,
                     'q0qen',
                     0,
                     'FE',
                     0,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     178,
                     'sbr1jj',
                     1,
                     'FE',
                     0,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     179,
                     'npqfa',
                     0,
                     'FE',
                     1,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     180,
                     'mfod84et',
                     0,
                     'FE',
                     0,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     181,
                     'mvgy',
                     1,
                     'FE',
                     0,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     182,
                     'ycuus',
                     0,
                     'FE',
                     0,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     183,
                     '6xp80q5tc',
                     1,
                     'FE',
                     0,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     184,
                     'yusvi2ru',
                     1,
                     'FE',
                     1,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     185,
                     'tou4req2x2',
                     0,
                     'FE',
                     1,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     186,
                     'q8ofapqpow',
                     1,
                     'FE',
                     0,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     187,
                     '9qz0',
                     0,
                     'FE',
                     1,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     188,
                     '8by97p7v2',
                     1,
                     'FE',
                     1,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     189,
                     '8a1k',
                     0,
                     'FE',
                     0,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     190,
                     'gorg1my2r7',
                     1,
                     'FE',
                     0,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     191,
                     '9pwsu',
                     1,
                     'FE',
                     0,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     192,
                     'sesw7ftou2',
                     0,
                     'FE',
                     0,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     193,
                     'jjhxdclr',
                     0,
                     'FE',
                     0,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     194,
                     'bieff',
                     1,
                     'FE',
                     1,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     195,
                     'q0an6rw9',
                     0,
                     'FE',
                     1,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     196,
                     'dwzqvc2si',
                     1,
                     'FE',
                     1,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     197,
                     'rfogq',
                     0,
                     'FE',
                     0,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     198,
                     'o3xq45uh4',
                     0,
                     'FE',
                     1,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     199,
                     'is17dm86',
                     0,
                     'FE',
                     0,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     200,
                     '8kgh',
                     1,
                     'FE',
                     0,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     201,
                     'pa0gww0ks6',
                     0,
                     'FE',
                     1,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     202,
                     'kjq1kan',
                     1,
                     'FE',
                     0,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     203,
                     '4j70y',
                     1,
                     'FE',
                     1,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );

INSERT INTO user (
                     uid,
                     name,
                     age,
                     job,
                     isFool,
                     registryDate,
                     lastUpdateDate
                 )
                 VALUES (
                     204,
                     '0lf349',
                     1,
                     'FE',
                     0,
                     '2020-11-11 03:11:41',
                     '2020-11-11 03:11:41'
                 );


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
