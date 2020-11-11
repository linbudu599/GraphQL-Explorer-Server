--
-- 由SQLiteStudio v3.2.1 产生的文件 周三 11月 11 11:24:01 2020
--
-- 文本编码：UTF-8
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- 表：task
DROP TABLE IF EXISTS task;

CREATE TABLE task (
    taskId      INTEGER PRIMARY KEY AUTOINCREMENT
                        NOT NULL,
    taskTitle   VARCHAR NOT NULL,
    taskContent VARCHAR NOT NULL,
    taskStatus  BOOLEAN NOT NULL
                        DEFAULT (0),
    taskReward  INTEGER NOT NULL,
    taskRate    INTEGER NOT NULL,
    assigneeUID INTEGER,
    CONSTRAINT UQ_d23f5b1bee4b42eeafa2c7f3780 UNIQUE (
        taskTitle
    ),
    CONSTRAINT FK_74cc5f54855c1c30815c9fda0cd FOREIGN KEY (
        assigneeUID
    )
    REFERENCES user (uid) ON DELETE NO ACTION
                          ON UPDATE NO ACTION
);

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     104,
                     'm88mxjvz3',
                     'n5xhhvrbzop5ckkn',
                     0,
                     165,
                     1,
                     155
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     105,
                     'lmv9',
                     '60gra3mev93rs7f6z',
                     1,
                     391,
                     6,
                     155
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     106,
                     '2azqg9f1sp',
                     'btw1',
                     0,
                     735,
                     7,
                     155
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     107,
                     'ny4mg0m',
                     'rh1ihzhz8',
                     1,
                     140,
                     6,
                     155
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     108,
                     'pm8m40v',
                     'p34zepi9m6z37',
                     1,
                     28,
                     1,
                     155
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     109,
                     'odbjhh34z',
                     'vsm65rmc4p4ca',
                     1,
                     995,
                     9,
                     155
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     110,
                     'idz2l13na',
                     'zqhgvaux2f7kj',
                     0,
                     400,
                     2,
                     155
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     111,
                     'xp5eoyq9z',
                     'fq4upc',
                     1,
                     964,
                     6,
                     155
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     112,
                     '7aipvihcj0',
                     'kcpc804wyfufs10mbbf',
                     0,
                     914,
                     0,
                     155
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     113,
                     'inlckhk',
                     'cokvt6pb4rc',
                     1,
                     430,
                     4,
                     155
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     114,
                     'xyn7qfnt',
                     '53ow',
                     0,
                     239,
                     2,
                     155
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     115,
                     'a38hb',
                     'nu4qjdla1su7rront9l',
                     0,
                     753,
                     5,
                     155
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     116,
                     'n36dt',
                     'l327',
                     1,
                     719,
                     4,
                     155
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     117,
                     'txnpf',
                     'o4p1htu1qt2mcnjtcaky',
                     1,
                     494,
                     7,
                     155
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     118,
                     '722dyyot',
                     'rw7x60',
                     1,
                     660,
                     8,
                     155
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     119,
                     'jqsqv4vq',
                     '098s4d2zr7sp60fg6uz9',
                     1,
                     472,
                     5,
                     155
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     120,
                     'hl7t43',
                     'y1molm',
                     1,
                     566,
                     7,
                     156
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     121,
                     'pd5f3',
                     'c91g2oop8nhods6pk8qh',
                     1,
                     77,
                     7,
                     156
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     122,
                     'hxszd5d',
                     '2jwiylet59x1jb',
                     0,
                     0,
                     5,
                     156
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     123,
                     'tjux',
                     'zayw11',
                     1,
                     643,
                     2,
                     156
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     124,
                     '2pg2qxf4r',
                     'pfsc0hspu',
                     0,
                     145,
                     10,
                     156
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     125,
                     'xmd5gv',
                     'rhgxhm6',
                     0,
                     510,
                     3,
                     156
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     126,
                     '58xz2',
                     '4i6w5rwiu',
                     0,
                     204,
                     10,
                     156
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     127,
                     'x5nkq2',
                     'b1zkhh3ooxflfb',
                     1,
                     231,
                     0,
                     156
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     128,
                     '81qc9zv',
                     'joy70vw',
                     0,
                     634,
                     7,
                     156
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     129,
                     '53h3',
                     'mpp91d',
                     1,
                     62,
                     9,
                     156
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     130,
                     'dkvt3p8hx2',
                     'lsuxwmnl6w64dt3hq',
                     0,
                     986,
                     7,
                     156
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     131,
                     '182837tb5',
                     'lx7bdj',
                     1,
                     273,
                     9,
                     156
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     132,
                     'be2dfa',
                     'd51lkk',
                     0,
                     32,
                     8,
                     156
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     133,
                     '8upcdp7p',
                     '8heh1q',
                     1,
                     692,
                     4,
                     156
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     134,
                     '6ftlnujn',
                     'r8dhi3z',
                     0,
                     324,
                     3,
                     156
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     135,
                     'rj8zpnqkb',
                     's29yvskj7a0p0uz9',
                     1,
                     12,
                     10,
                     156
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     136,
                     'hoo4x3',
                     'qx4c6ulub8tq56rsrz',
                     0,
                     349,
                     4,
                     157
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     137,
                     'hvi89vcm9',
                     'jov7z3j5tv7e',
                     0,
                     531,
                     9,
                     157
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     138,
                     '62dd11n',
                     '12imad',
                     0,
                     961,
                     8,
                     157
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     139,
                     'lqywufh',
                     '5n3ri13t696khw0rtng',
                     1,
                     697,
                     5,
                     157
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     140,
                     '3duiw4yxwt',
                     'z15gf1n1bkq',
                     1,
                     868,
                     5,
                     157
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     141,
                     'gdccw9bb',
                     '3j204uqh15gcsn',
                     0,
                     508,
                     5,
                     157
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     142,
                     '5k4r3',
                     'im5ovgb91kjg0',
                     0,
                     780,
                     1,
                     157
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     143,
                     'v9lwk4pet2',
                     'utzv6kq9rrpwx',
                     0,
                     496,
                     9,
                     157
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     144,
                     'c5isjv21v',
                     'a8my6laybp4',
                     1,
                     614,
                     1,
                     157
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     145,
                     'ovalmb8b',
                     'dl38dolk4sao321ji0',
                     1,
                     482,
                     10,
                     157
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     146,
                     'bxys',
                     'ayq0jzuk2uc5kwum5z',
                     1,
                     622,
                     6,
                     157
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     147,
                     'd71mc',
                     'cpqi4wk',
                     1,
                     606,
                     1,
                     158
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     148,
                     'lp5zqsey',
                     '2jm6fr7',
                     0,
                     701,
                     6,
                     158
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     149,
                     'xai2v623u1',
                     '75cy6z55drg',
                     1,
                     278,
                     7,
                     158
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     150,
                     'ovqv8ye',
                     '26ugctepabd79n95',
                     1,
                     215,
                     3,
                     158
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     151,
                     'hlzywo5w9o',
                     'sxtr',
                     0,
                     149,
                     4,
                     158
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     152,
                     'm94i4',
                     'ipai1kaol93d38r0f0',
                     1,
                     118,
                     3,
                     158
                 );

INSERT INTO task (
                     taskId,
                     taskTitle,
                     taskContent,
                     taskStatus,
                     taskReward,
                     taskRate,
                     assigneeUID
                 )
                 VALUES (
                     153,
                     'yc15',
                     'fmadb67rjl6xztdp8x7c',
                     1,
                     889,
                     0,
                     158
                 );


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
