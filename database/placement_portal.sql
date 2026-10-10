CREATE DATABASE placement_portal;
USE placement_portal;
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE profiles (
    profile_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    college VARCHAR(100),
    course VARCHAR(50),
    semester VARCHAR(20),
    cgpa DECIMAL(3,2),
    skills TEXT,
    github VARCHAR(255),
    linkedin VARCHAR(255),

    FOREIGN KEY (user_id)
    REFERENCES users(user_id)
    ON DELETE CASCADE
);
CREATE TABLE jobs (
    job_id INT AUTO_INCREMENT PRIMARY KEY,
    company VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    salary VARCHAR(50),
    description TEXT,
    apply_link TEXT
);
CREATE TABLE job_applications (
    application_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    job_id INT NOT NULL,
    applied_on DATE,
    status VARCHAR(30),

    FOREIGN KEY (user_id)
    REFERENCES users(user_id)
    ON DELETE CASCADE,

    FOREIGN KEY (job_id)
    REFERENCES jobs(job_id)
    ON DELETE CASCADE
);
CREATE TABLE coding_questions (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150),
    difficulty VARCHAR(20),
    topic VARCHAR(100),
    description TEXT,
    sample_input TEXT,
    sample_output TEXT
);
CREATE TABLE aptitude_questions (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(50),
    question TEXT,
    option1 VARCHAR(255),
    option2 VARCHAR(255),
    option3 VARCHAR(255),
    option4 VARCHAR(255),
    answer VARCHAR(255)
);
CREATE TABLE mock_tests (
    test_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    duration INT,
    total_questions INT
);
CREATE TABLE mock_test_results (
    result_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    test_id INT,
    score INT,
    percentage DECIMAL(5,2),
    completed_at DATETIME,

    FOREIGN KEY (user_id)
    REFERENCES users(user_id)
    ON DELETE CASCADE,

    FOREIGN KEY (test_id)
    REFERENCES mock_tests(test_id)
    ON DELETE CASCADE
);
CREATE TABLE resumes (
    resume_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    objective TEXT,
    education TEXT,
    experience TEXT,
    projects TEXT,
    skills TEXT,
    certifications TEXT,

    FOREIGN KEY (user_id)
    REFERENCES users(user_id)
    ON DELETE CASCADE
);
CREATE TABLE chatbot_history (
    chat_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    user_message TEXT,
    bot_response TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
    REFERENCES users(user_id)
    ON DELETE CASCADE
);
CREATE TABLE dashboard_progress(
    progress_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    placement_readiness INT DEFAULT 0,
    current_streak INT DEFAULT 0,
    best_streak INT DEFAULT 0,
    weekly_goal INT DEFAULT 7,
    weekly_completed INT DEFAULT 0,
    xp_points INT DEFAULT 0,
    level_no INT DEFAULT 1,

    FOREIGN KEY(user_id)
    REFERENCES users(user_id)
    ON DELETE CASCADE
);
CREATE TABLE analytics(
    analytics_id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT,

    week1 INT,
    week2 INT,
    week3 INT,
    week4 INT,

    FOREIGN KEY(user_id)
    REFERENCES users(user_id)
);
CREATE TABLE leaderboard(
    leaderboard_id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT,

    rank_position INT,

    total_students INT,

    FOREIGN KEY(user_id)
    REFERENCES users(user_id)
);
CREATE TABLE career_roadmap(

roadmap_id INT AUTO_INCREMENT PRIMARY KEY,

user_id INT,

step_name VARCHAR(100),

status ENUM('Completed','In Progress','Pending'),

FOREIGN KEY(user_id)
REFERENCES users(user_id)

);
CREATE TABLE achievements(

achievement_id INT AUTO_INCREMENT PRIMARY KEY,

user_id INT,

badge_name VARCHAR(100),

badge_image VARCHAR(255),

FOREIGN KEY(user_id)
REFERENCES users(user_id)

);
SHOW TABLES;
INSERT INTO dashboard_progress
(user_id,placement_readiness,current_streak,best_streak,weekly_goal,weekly_completed,xp_points,level_no)

VALUES

(2,84,18,23,7,5,720,12);
INSERT INTO analytics

(user_id,week1,week2,week3,week4)

VALUES

(2,60,70,82,92);
INSERT INTO leaderboard

(user_id,rank_position,total_students)

VALUES

(2,24,4562);
INSERT INTO career_roadmap
(user_id,step_name,status)

VALUES

(2,'Resume','Completed'),

(2,'Aptitude','Completed'),

(2,'Coding','In Progress'),

(2,'Interview','Pending'),

(2,'Placement','Pending');
INSERT INTO achievements

(user_id,badge_name)

VALUES

(2,'Consistency King'),

(2,'Aptitude Ace'),

(2,'Code Warrior');
INSERT INTO jobs (company, role, location, salary, description, apply_link) VALUES
('TCS','Software Engineer','Bangalore','4.5 LPA','Entry-level software development role.','https://www.tcs.com/careers'),

('Infosys','Systems Engineer','Mysore','4.2 LPA','Develop enterprise software solutions.','https://career.infosys.com'),

('Wipro','Project Engineer','Hyderabad','4.0 LPA','Software development and testing.','https://careers.wipro.com'),

('Accenture','Associate Software Engineer','Bangalore','4.6 LPA','Application development and maintenance.','https://www.accenture.com/in-en/careers'),

('Capgemini','Software Engineer','Chennai','4.3 LPA','Develop web applications.','https://www.capgemini.com/careers'),

('Cognizant','Programmer Analyst','Coimbatore','4.5 LPA','Application support and development.','https://careers.cognizant.com'),

('IBM','Associate System Engineer','Bangalore','4.8 LPA','Cloud and enterprise application development.','https://www.ibm.com/careers'),

('HCLTech','Graduate Engineer Trainee','Noida','4.25 LPA','IT services and software development.','https://www.hcltech.com/careers'),

('Tech Mahindra','Software Engineer','Pune','4.1 LPA','Software development and testing.','https://careers.techmahindra.com'),

('Zoho','Software Developer','Chennai','7 LPA','Product development using modern technologies.','https://www.zoho.com/careers');
SELECT * FROM jobs;

INSERT INTO coding_questions
(title,difficulty,topic,description,sample_input,sample_output)
VALUES

('Two Sum','Easy','Arrays',
'Find two numbers whose sum equals the target.',
'nums=[2,7,11,15], target=9',
'[0,1]'),

('Palindrome Number','Easy','Math',
'Check whether a number is palindrome.',
'121',
'true'),

('Reverse String','Easy','Strings',
'Reverse a given string.',
'hello',
'olleh'),

('Valid Parentheses','Easy','Stack',
'Check if parentheses are valid.',
'()[]{}',
'true'),

('Binary Search','Easy','Searching',
'Implement binary search.',
'1 3 5 7 9',
'Index 2'),

('Merge Sorted Arrays','Medium','Arrays',
'Merge two sorted arrays.',
'[1,3] [2,4]',
'[1,2,3,4]'),

('Longest Substring Without Repeating Characters',
'Medium','Strings',
'Find longest substring.',
'abcabcbb',
'3'),

('Maximum Subarray',
'Medium',
'Dynamic Programming',
'Find maximum sum contiguous subarray.',
'-2,1,-3,4,-1,2,1,-5,4',
'6');
SELECT * FROM coding_questions;
INSERT INTO aptitude_questions
(category,question,option1,option2,option3,option4,answer)
VALUES

('Quantitative',
'25% of 400 = ?',
'50',
'75',
'100',
'125',
'100'),

('Logical',
'Which comes next? 2,4,8,16,?',
'18',
'24',
'32',
'64',
'32'),

('Verbal',
'Choose the synonym of Rapid.',
'Slow',
'Fast',
'Weak',
'Cold',
'Fast'),

('Quantitative',
'What is 18 × 12?',
'196',
'214',
'216',
'218',
'216'),

('Logical',
'If A=1 and Z=26, what is CAT?',
'24',
'27',
'31',
'35',
'24');
SELECT * FROM aptitude_questions;
INSERT INTO mock_tests
(title,duration,total_questions)
VALUES

('TCS NQT Mock Test',60,20),

('Infosys Mock Test',60,20),

('Accenture Mock Test',75,25),

('General Placement Test',90,30);
SELECT * FROM mock_tests;
USE placement_portal;
SELECT user_id, full_name, email, password
FROM users;
USE placement_portal;
DELETE FROM users
WHERE email = 'janani@gmail.com';
USE placement_portal;
DESCRIBE dashboard_progress;
USE placement_portal;
DESCRIBE achievements;
DESCRIBE leaderboard;
DESCRIBE career_roadmap;
USE placement_portal;
SELECT * FROM career_roadmap;
USE placement_portal;
DELETE FROM achievements
WHERE achievement_id > 3;
DELETE FROM analytics
WHERE analytics_id > 1;
SELECT * FROM analytics;
DELETE FROM career_roadmap
WHERE roadmap_id > 5;
USE placement_portal;
ALTER TABLE jobs
ADD COLUMN job_type VARCHAR(50),
ADD COLUMN experience VARCHAR(50),
ADD COLUMN posted VARCHAR(30);

DESCRIBE jobs;
UPDATE jobs
SET
    job_type = 'Full Time',
    experience = '0-2 Years',
    posted = '1 day ago'
WHERE job_id = 2;
UPDATE jobs
SET job_type='Full Time',
    experience='0-2 Years',
    posted='2 days ago'
WHERE job_id=3;

UPDATE jobs
SET job_type='Full Time',
    experience='0-2 Years',
    posted='Today'
WHERE job_id=4;

UPDATE jobs
SET job_type='Full Time',
    experience='1-3 Years',
    posted='3 days ago'
WHERE job_id=5;

UPDATE jobs
SET job_type='Full Time',
    experience='0-2 Years',
    posted='2 days ago'
WHERE job_id=6;

UPDATE jobs
SET job_type='Full Time',
    experience='0-2 Years',
    posted='Today'
WHERE job_id=7;

UPDATE jobs
SET job_type='Full Time',
    experience='0-1 Years',
    posted='2 days ago'
WHERE job_id=8;

UPDATE jobs
SET job_type='Full Time',
    experience='0-2 Years',
    posted='Today'
WHERE job_id=9;

UPDATE jobs
SET job_type='Full Time',
    experience='0-2 Years',
    posted='Today'
WHERE job_id=10;

UPDATE jobs
SET job_type='Full Time',
    experience='0-2 Years',
    posted='Today'
WHERE job_id=11;
ALTER TABLE jobs
ADD COLUMN skills VARCHAR(255),
ADD COLUMN eligibility VARCHAR(50),
ADD COLUMN deadline DATE;
UPDATE jobs
SET
skills='Java, SQL, Aptitude',
eligibility='6.5 CGPA',
deadline='2026-08-30'
WHERE job_id=2;

UPDATE jobs
SET
skills='Java, Python, SQL',
eligibility='6.0 CGPA',
deadline='2026-09-02'
WHERE job_id=3;

UPDATE jobs
SET
skills='Java, React, SQL',
eligibility='6.5 CGPA',
deadline='2026-09-05'
WHERE job_id=4;
DESCRIBE jobs;
UPDATE jobs
SET
    skills = 'Java, SQL, Aptitude',
    eligibility = '60%'
WHERE job_id = 2;

UPDATE jobs
SET
    skills = 'Java, Python, DBMS',
    eligibility = '60%'
WHERE job_id = 3;

UPDATE jobs
SET
    skills = 'Java, SQL, Communication',
    eligibility = '60%'
WHERE job_id = 4;

UPDATE jobs
SET
    skills = 'Java, SQL, Aptitude',
    eligibility = '60%'
WHERE job_id = 5;

UPDATE jobs
SET
    skills = 'Java, Python, DBMS',
    eligibility = '60%'
WHERE job_id = 6;

UPDATE jobs
SET
    skills = 'Java, Cloud, Linux',
    eligibility = '65%'
WHERE job_id = 7;

UPDATE jobs
SET
    skills = 'Java, SQL, Aptitude',
    eligibility = '60%'
WHERE job_id = 8;

UPDATE jobs
SET
    skills = 'Java, SQL, Communication',
    eligibility = '60%'
WHERE job_id = 9;

UPDATE jobs
SET
    skills = 'C++, Java, DSA',
    eligibility = '70%'
WHERE job_id = 10;

UPDATE jobs
SET
    skills = 'C++, Java, System Design',
    eligibility = '75%'
WHERE job_id = 11;

CREATE TABLE aptitude_topics(
    topic_id INT AUTO_INCREMENT PRIMARY KEY,
    topic_name VARCHAR(100) NOT NULL,
    description TEXT,
    image VARCHAR(255)
);
INSERT INTO aptitude_topics(topic_name, description, image)
VALUES

('Percentage',
'Master percentage calculations.',
'percentage.jpeg'),

('Profit and Loss',
'Solve business mathematics problems.',
'profit.jpeg'),

('Time and Work',
'Improve work efficiency problems',
'timework.jpeg'),

('Number System',
'Learn fundamental number concepts.',
'numbersystem.jpeg'),

('Logical Reasoning',
'Develop analytical thinking skills.',
'logical.jpeg'),

('Data Interpretation',
'Analyze charts and graphs.',
'data.jpeg'),

('Blood Relation',
'Practice family relationship problems.',
'blood.jpeg'),

('Direction Sense',
'Master direction based questions.',
'direction.jpeg'),

('Seating Arrangement',
'Solve arrangement puzzles.',
'seating.jpeg'),

('Coding Decoding',
'Crack logical coding patterns.',
'coding.jpeg'),

('Simple Interest',
'Practice financial calculations.',
'interest.jpeg'),

('Ratio and Proportion',
'Solve comparison problems.',
'ratio.jpeg');

CREATE TABLE aptitude_questions(
    question_id INT AUTO_INCREMENT PRIMARY KEY,

    topic_id INT NOT NULL,

    question TEXT NOT NULL,

    option_a VARCHAR(255),
    option_b VARCHAR(255),
    option_c VARCHAR(255),
    option_d VARCHAR(255),

    correct_answer VARCHAR(255),

    explanation TEXT,

    difficulty ENUM('Easy','Medium','Hard') DEFAULT 'Medium',

    FOREIGN KEY(topic_id)
    REFERENCES aptitude_topics(topic_id)
    ON DELETE CASCADE
);

INSERT INTO aptitude_questions
(category,question,option1,option2,option3,option4,answer)
VALUES

('Profit and Loss',
'A shopkeeper buys an item for ₹500 and sells it for ₹600. What is the profit percentage?',
'10%',
'15%',
'20%',
'25%',
'20%'),

('Profit and Loss',
'If the cost price of an article is ₹800 and loss is 10%, what is the selling price?',
'700',
'720',
'750',
'780',
'720'),


('Time and Work',
'A can complete a work in 10 days. How much work does A complete in one day?',
'1/5',
'1/10',
'1/15',
'1/20',
'1/10'),

('Time and Work',
'A and B can complete a work in 12 days and 18 days respectively. Together they complete the work in?',
'6 days',
'7.2 days',
'8 days',
'10 days',
'7.2 days'),


('Number System',
'What is the smallest prime number?',
'0',
'1',
'2',
'3',
'2'),

('Number System',
'Which of the following is divisible by 3?',
'124',
'235',
'372',
'451',
'372'),


('Data Interpretation',
'A company sold 200 laptops in January and 300 laptops in February. What is the total sales?',
'400',
'450',
'500',
'550',
'500'),

('Data Interpretation',
'If a pie chart shows 25% of students like Java and total students are 400, how many students like Java?',
'50',
'75',
'100',
'125',
'100'),


('Blood Relation',
'Raj is the brother of Sita. Sita is the mother of Rahul. How is Raj related to Rahul?',
'Father',
'Uncle',
'Brother',
'Grandfather',
'Uncle'),

('Blood Relation',
'Pointing to a man, Ravi said, "He is the son of my grandfather." Who is the man to Ravi?',
'Father',
'Brother',
'Uncle',
'Cousin',
'Father'),


('Direction Sense',
'A person walks 5 km north and then 5 km east. In which direction is he from the starting point?',
'North',
'South',
'North-East',
'West',
'North-East'),

('Direction Sense',
'If you face east and turn right, which direction will you face?',
'North',
'South',
'East',
'West',
'South'),


('Seating Arrangement',
'Five people A, B, C, D and E sit in a row. A is left of B and C is right of B. Who sits between A and C?',
'A',
'B',
'D',
'E',
'B'),

('Seating Arrangement',
'In a circular arrangement, if all persons face the center, the left side represents?',
'Clockwise',
'Anticlockwise',
'Opposite',
'None',
'Clockwise'),


('Coding Decoding',
'If CAT is coded as DBU, how is DOG coded?',
'EPH',
'EPG',
'FOH',
'DPH',
'EPH'),

('Coding Decoding',
'If PEN is coded as QFO, how is MAP coded?',
'NBQ',
'MBQ',
'NAP',
'LBQ',
'NBQ'),


('Simple Interest',
'Find the simple interest on ₹1000 at 10% per annum for 2 years.',
'100',
'150',
'200',
'250',
'200'),

('Simple Interest',
'The formula for simple interest is?',
'P+R+T',
'P×R×T/100',
'P/R×T',
'P×T',
'P×R×T/100'),


('Ratio and Proportion',
'The ratio of boys to girls is 2:3. If there are 20 boys, how many girls are there?',
'25',
'30',
'35',
'40',
'30'),

('Ratio and Proportion',
'If 4:8 = x:16, find x.',
'2',
'4',
'8',
'12',
'8');

CREATE TABLE aptitude_tests(

    test_id INT AUTO_INCREMENT PRIMARY KEY,

    test_name VARCHAR(150) NOT NULL,

    topic_id INT,

    total_questions INT DEFAULT 10,

    duration_minutes INT DEFAULT 15,

    difficulty ENUM('Easy','Medium','Hard')
    DEFAULT 'Medium',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    FOREIGN KEY(topic_id)
    REFERENCES aptitude_topics(topic_id)
    ON DELETE CASCADE
);
INSERT INTO aptitude_tests
(test_name, topic_id, total_questions, duration_minutes, difficulty)
VALUES

('Percentage Practice Test',1,10,15,'Easy'),

('Profit and Loss Practice Test',2,10,15,'Medium'),

('Time and Work Practice Test',3,10,20,'Medium'),

('Number System Practice Test',4,10,15,'Easy'),

('Logical Reasoning Practice Test',5,15,20,'Medium'),

('Data Interpretation Practice Test',6,10,20,'Medium'),

('Blood Relation Practice Test',7,10,15,'Easy'),

('Direction Sense Practice Test',8,10,15,'Easy'),

('Seating Arrangement Practice Test',9,15,25,'Hard'),

('Coding Decoding Practice Test',10,10,15,'Medium'),

('Simple Interest Practice Test',11,10,15,'Easy'),

('Ratio and Proportion Practice Test',12,10,15,'Medium');

CREATE TABLE aptitude_attempts(

    attempt_id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    test_id INT NOT NULL,

    score INT DEFAULT 0,

    total_questions INT,

    correct_answers INT DEFAULT 0,

    wrong_answers INT DEFAULT 0,

    accuracy DECIMAL(5,2) DEFAULT 0,

    time_taken INT,

    attempted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    FOREIGN KEY(user_id)
    REFERENCES users(user_id)
    ON DELETE CASCADE,


    FOREIGN KEY(test_id)
    REFERENCES aptitude_tests(test_id)
    ON DELETE CASCADE
);
DESC users;
SELECT * FROM users;
SELECT * FROM aptitude_tests;
SELECT user_id, full_name FROM users;

INSERT INTO aptitude_attempts
(user_id, test_id, score, total_questions, correct_answers, wrong_answers, accuracy, time_taken)
VALUES

(2,1,8,10,8,2,80.00,720),

(2,2,7,10,7,3,70.00,850),

(2,3,9,10,9,1,90.00,900),

(2,4,8,10,8,2,80.00,700),

(2,5,12,15,12,3,80.00,1100),

(2,6,8,10,8,2,80.00,950),

(2,7,9,10,9,1,90.00,650),

(2,8,7,10,7,3,70.00,750),

(2,9,11,15,11,4,73.33,1500),

(2,10,8,10,8,2,80.00,850),

(2,11,9,10,9,1,90.00,600),

(2,12,8,10,8,2,80.00,750);
SELECT * FROM aptitude_attempts;
INSERT INTO aptitude_attempts
(user_id, test_id, score, total_questions, correct_answers, wrong_answers, accuracy, time_taken)
VALUES

(2,7,9,10,9,1,90.00,650),

(2,8,7,10,7,3,70.00,750),

(2,9,11,15,11,4,73.33,1500),

(2,10,8,10,8,2,80.00,850),

(2,11,9,10,9,1,90.00,600),

(2,12,8,10,8,2,80.00,750);

CREATE TABLE user_aptitude_progress(

    progress_id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    topic_id INT NOT NULL,

    questions_solved INT DEFAULT 0,

    correct_answers INT DEFAULT 0,

    accuracy DECIMAL(5,2) DEFAULT 0,

    last_attempted DATE,


    FOREIGN KEY(user_id)
    REFERENCES users(user_id)
    ON DELETE CASCADE,


    FOREIGN KEY(topic_id)
    REFERENCES aptitude_topics(topic_id)
    ON DELETE CASCADE
);
INSERT INTO user_aptitude_progress
(user_id, topic_id, questions_solved, correct_answers, accuracy, last_attempted)
VALUES

(2,1,20,16,80.00,'2026-07-12'),

(2,2,20,14,70.00,'2026-07-12'),

(2,3,20,18,90.00,'2026-07-12'),

(2,4,20,16,80.00,'2026-07-12'),

(2,5,30,24,80.00,'2026-07-12'),

(2,6,20,16,80.00,'2026-07-12'),

(2,7,20,18,90.00,'2026-07-12'),

(2,8,20,14,70.00,'2026-07-12'),

(2,9,30,22,73.33,'2026-07-12'),

(2,10,20,16,80.00,'2026-07-12'),

(2,11,20,18,90.00,'2026-07-12'),

(2,12,20,16,80.00,'2026-07-12');

CREATE TABLE skill_progress(

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    skill_name VARCHAR(100),

    score INT DEFAULT 0,

    progress_date DATE,

    FOREIGN KEY(user_id)
    REFERENCES users(user_id)
);

CREATE TABLE weekly_goals(

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT,

    goal_title VARCHAR(150),

    target INT,

    completed INT DEFAULT 0,

    week_start DATE,


    FOREIGN KEY(user_id)
    REFERENCES users(user_id)

);
CREATE TABLE dashboard_summary(

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT UNIQUE,

    aptitude_score INT DEFAULT 0,

    coding_score INT DEFAULT 0,

    tests_completed INT DEFAULT 0,

    rank_position INT DEFAULT 0,

    total_points INT DEFAULT 0,


    FOREIGN KEY(user_id)
    REFERENCES users(user_id)

);
USE placement_portal;
SELECT * FROM aptitude_topics;
SELECT question_id, category, question
FROM aptitude_questions;
SET SQL_SAFE_UPDATES = 0;
UPDATE aptitude_questions
SET category = 'Percentage'
WHERE category = 'Quantitative';

UPDATE aptitude_questions
SET category = 'Logical Reasoning'
WHERE category = 'Logical';
SET SQL_SAFE_UPDATES = 1;
UPDATE aptitude_questions
SET category = 'Percentage'
WHERE question_id IN (1,4);

UPDATE aptitude_questions
SET category = 'Logical Reasoning'
WHERE question_id IN (2,5);

USE placement_portal;
CREATE TABLE aptitude_attempts (
    attempt_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    test_id INT,
    score INT,
    total_questions INT,
    correct_answers INT,
    wrong_answers INT,
    accuracy INT,
    time_taken INT,
    attempted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM dashboard_progress LIMIT 1
SELECT 
COUNT(*) AS tests_attempted,
AVG(score) AS average_score,
AVG(accuracy) AS average_accuracy
FROM aptitude_attempts
WHERE user_id = 2;

SELECT * FROM dashboard_progress LIMIT 1;
SELECT * FROM analytics;
SELECT * FROM leaderboard;

SELECT 
attempt_id,
score,
accuracy
FROM aptitude_attempts;

DESCRIBE aptitude_attempts;
DESCRIBE aptitude_tests;
DESCRIBE aptitude_topics;

CREATE TABLE coding_topics (
    topic_id INT PRIMARY KEY AUTO_INCREMENT,
    topic_name VARCHAR(100) NOT NULL,
    description TEXT,
    image VARCHAR(255)
);

CREATE TABLE coding_questions (
    question_id INT PRIMARY KEY AUTO_INCREMENT,
    topic_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    difficulty ENUM('Easy','Medium','Hard') DEFAULT 'Easy',
    company VARCHAR(100),
    constraints TEXT,
    sample_input TEXT,
    sample_output TEXT,
    FOREIGN KEY(topic_id)
    REFERENCES coding_topics(topic_id)
    ON DELETE CASCADE

);
CREATE TABLE coding_testcases (

    testcase_id INT PRIMARY KEY AUTO_INCREMENT,

    question_id INT NOT NULL,

    input_data TEXT,

    expected_output TEXT,

    is_hidden BOOLEAN DEFAULT FALSE,

    FOREIGN KEY(question_id)
    REFERENCES coding_questions(question_id)
    ON DELETE CASCADE

);
CREATE TABLE coding_attempts (

    attempt_id INT PRIMARY KEY AUTO_INCREMENT,

    user_id INT NOT NULL,

    question_id INT NOT NULL,

    language VARCHAR(50),

    code LONGTEXT,

    score INT DEFAULT 0,

    passed_testcases INT DEFAULT 0,

    total_testcases INT DEFAULT 0,

    status ENUM('Solved','Attempted') DEFAULT 'Attempted',

    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(question_id)
    REFERENCES coding_questions(question_id)
    ON DELETE CASCADE

);
CREATE TABLE user_coding_progress (

    progress_id INT PRIMARY KEY AUTO_INCREMENT,

    user_id INT NOT NULL,

    topic_id INT NOT NULL,

    questions_solved INT DEFAULT 0,

    total_questions INT DEFAULT 0,

    completion_percentage DECIMAL(5,2) DEFAULT 0,

    FOREIGN KEY(topic_id)
    REFERENCES coding_topics(topic_id)
    ON DELETE CASCADE

);
SHOW TABLES;

SELECT * FROM coding_topics;
SET SQL_SAFE_UPDATES = 0;
DELETE FROM coding_topics;
SET SQL_SAFE_UPDATES = 1;

INSERT INTO coding_topics (topic_name, description, image) VALUES
('Arrays','Practice array problems','arrays.jpeg'),
('Strings','Practice string manipulation','strings.jpeg'),
('Linked List','Learn linked list problems','linkedlist.jpeg'),
('Stack & Queue','Stack and queue implementation and problems','stack and queue.jpeg'),
('Trees','Binary trees and BST problems','trees.jpeg'),
('Graphs','Graph traversal and shortest path','graphs.jpeg'),
('Dynamic Programming','DP optimization problems','dynamic programming.jpeg'),
('Searching','Linear Search and Binary Search problems','searching.jpeg'),
('Sorting','Practice Bubble, Merge, Quick and Heap Sort','sorting.jpeg'),
('Backtracking','Backtracking problems like N-Queens and Sudoku','backtracking.jpeg');

SELECT * FROM coding_topics;
DESCRIBE coding_questions;
INSERT INTO coding_questions
(title, difficulty, topic, description, sample_input, sample_output)
VALUES

('Two Sum',
'Easy',
'Arrays',
'Find two numbers in an array whose sum equals the target value.',
'nums=[2,7,11,15], target=9',
'[0,1]'),

('Maximum Subarray Sum',
'Medium',
'Arrays',
'Find the contiguous subarray with the maximum sum.',
'[-2,1,-3,4,-1,2,1]',
'6'),

('Rotate Array',
'Medium',
'Arrays',
'Rotate an array to the right by k positions.',
'[1,2,3,4,5], k=2',
'[4,5,1,2,3]'),

('Remove Duplicates from Sorted Array',
'Easy',
'Arrays',
'Remove duplicate elements from a sorted array.',
'[1,1,2,2,3]',
'[1,2,3]'),

('Merge Two Sorted Arrays',
'Easy',
'Arrays',
'Merge two sorted arrays into one sorted array.',
'[1,3,5] and [2,4,6]',
'[1,2,3,4,5,6]');
SELECT * FROM coding_questions;
INSERT INTO coding_questions
(title, difficulty, topic, description, sample_input, sample_output)
VALUES

('Reverse String',
'Easy',
'Strings',
'Reverse a given string.',
'hello',
'olleh'),

('Palindrome Check',
'Easy',
'Strings',
'Check whether a string is palindrome or not.',
'madam',
'true'),

('Longest Substring Without Repeating Characters',
'Medium',
'Strings',
'Find the length of the longest substring without repeating characters.',
'abcabcbb',
'3'),

('Anagram Check',
'Easy',
'Strings',
'Check whether two strings are anagrams.',
'listen, silent',
'true'),

('Character Frequency Count',
'Easy',
'Strings',
'Count frequency of each character in a string.',
'aabbc',
'a:2,b:2,c:1');
SELECT * FROM coding_questions
WHERE topic='Strings';

INSERT INTO coding_questions
(title, difficulty, topic, description, sample_input, sample_output)
VALUES

('Reverse Linked List',
'Easy',
'Linked List',
'Reverse a singly linked list.',
'1 -> 2 -> 3 -> 4 -> NULL',
'4 -> 3 -> 2 -> 1 -> NULL'),

('Detect Cycle in Linked List',
'Medium',
'Linked List',
'Check whether a linked list contains a cycle.',
'1 -> 2 -> 3 -> 4 -> 2',
'true'),

('Find Middle of Linked List',
'Easy',
'Linked List',
'Find the middle node of a linked list.',
'1 -> 2 -> 3 -> 4 -> 5',
'3'),

('Merge Two Sorted Linked Lists',
'Easy',
'Linked List',
'Merge two sorted linked lists into one sorted list.',
'List1: 1->3->5, List2: 2->4->6',
'1->2->3->4->5->6'),

('Remove Nth Node From End',
'Medium',
'Linked List',
'Remove the Nth node from the end of a linked list.',
'1->2->3->4->5, n=2',
'1->2->3->5');
SELECT * FROM coding_questions
WHERE topic='Linked List';

INSERT INTO coding_questions
(title, difficulty, topic, description, sample_input, sample_output)
VALUES

('Valid Parentheses',
'Easy',
'Stack & Queue',
'Check whether the given brackets are balanced using a stack.',
'Input: ({[]})',
'Output: true'),

('Implement Stack Using Array',
'Easy',
'Stack & Queue',
'Implement stack operations like push, pop, and peek using an array.',
'Push: 10,20,30 Pop',
'Output: 30'),

('Next Greater Element',
'Medium',
'Stack & Queue',
'Find the next greater element for every element in an array using stack.',
'Input: [4,5,2,25]',
'Output: [5,25,25,-1]'),

('Implement Queue Using Two Stacks',
'Medium',
'Stack & Queue',
'Implement queue operations using two stacks.',
'Enqueue: 10,20,30 Dequeue',
'Output: 10'),

('Min Stack',
'Hard',
'Stack & Queue',
'Design a stack that supports retrieving minimum element in constant time.',
'Push: 5,3,7 GetMin',
'Output: 3');
SELECT * FROM coding_questions
WHERE topic='Stack & Queue';

INSERT INTO coding_questions
(title, difficulty, topic, description, sample_input, sample_output)
VALUES

('Binary Tree Traversal',
'Easy',
'Trees',
'Perform inorder, preorder and postorder traversal of a binary tree.',
'Tree: 1 2 3',
'Inorder: 2 1 3'),

('Height of Binary Tree',
'Easy',
'Trees',
'Find the height or maximum depth of a binary tree.',
'Tree: 1 / 2 3 / 4',
'Height = 3'),

('Check Binary Search Tree',
'Medium',
'Trees',
'Check whether a binary tree is a valid Binary Search Tree.',
'Tree: 2 / 1 3',
'true'),

('Level Order Traversal',
'Medium',
'Trees',
'Print nodes of a binary tree level by level using queue.',
'Tree: 1 / 2 3 / 4 5',
'1 2 3 4 5'),

('Lowest Common Ancestor of Binary Tree',
'Hard',
'Trees',
'Find the lowest common ancestor of two nodes in a binary tree.',
'Tree with nodes 5 and 1',
'LCA = 3');
SELECT * FROM coding_questions
WHERE topic='Trees';
INSERT INTO coding_questions
(title, difficulty, topic, description, sample_input, sample_output)
VALUES

('Breadth First Search (BFS)',
'Easy',
'Graphs',
'Traverse a graph using Breadth First Search algorithm.',
'Graph: 1-2,1-3,2-4',
'1 2 3 4'),

('Depth First Search (DFS)',
'Easy',
'Graphs',
'Traverse a graph using Depth First Search algorithm.',
'Graph: 1-2,1-3,2-4',
'1 2 4 3'),

('Detect Cycle in Graph',
'Medium',
'Graphs',
'Check whether a given graph contains a cycle.',
'Edges: (1,2),(2,3),(3,1)',
'true'),

('Shortest Path in Graph',
'Medium',
'Graphs',
'Find the shortest path between two nodes using graph algorithms.',
'Graph with source=0',
'Shortest distance array'),

('Number of Islands',
'Hard',
'Graphs',
'Find the number of connected islands in a 2D grid.',
'Grid: [[1,1,0],[0,1,0],[1,0,1]]',
'3');
INSERT INTO coding_questions
(title, difficulty, topic, description, sample_input, sample_output)
VALUES

('Fibonacci Number',
'Easy',
'Dynamic Programming',
'Find the nth Fibonacci number using dynamic programming.',
'n=5',
'5'),

('Climbing Stairs',
'Easy',
'Dynamic Programming',
'Find the number of ways to reach the top of stairs when you can climb 1 or 2 steps.',
'n=5',
'8'),

('Longest Common Subsequence',
'Medium',
'Dynamic Programming',
'Find the longest common subsequence between two strings.',
'str1=abcde, str2=ace',
'3'),

('0/1 Knapsack Problem',
'Medium',
'Dynamic Programming',
'Find maximum profit by selecting items with weight constraints.',
'weights=[1,2,3], values=[10,15,40], capacity=6',
'65'),

('Longest Increasing Subsequence',
'Hard',
'Dynamic Programming',
'Find the length of the longest increasing subsequence.',
'[10,9,2,5,3,7,101]',
'4');
INSERT INTO coding_questions
(title, difficulty, topic, description, sample_input, sample_output)
VALUES

('Linear Search',
'Easy',
'Searching',
'Search for an element in an array using linear search.',
'arr=[10,20,30], target=20',
'1'),

('Binary Search',
'Easy',
'Searching',
'Search an element in a sorted array using binary search.',
'arr=[1,3,5,7], target=5',
'2'),

('First and Last Position',
'Medium',
'Searching',
'Find the first and last occurrence of an element in a sorted array.',
'arr=[5,7,7,8,8,10], target=8',
'[3,4]'),

('Search in Rotated Sorted Array',
'Medium',
'Searching',
'Search an element in a rotated sorted array.',
'arr=[4,5,6,7,0,1,2], target=0',
'4'),

('Find Peak Element',
'Hard',
'Searching',
'Find an index of a peak element in an array.',
'arr=[1,2,3,1]',
'2');
INSERT INTO coding_questions
(title, difficulty, topic, description, sample_input, sample_output)
VALUES

('Bubble Sort',
'Easy',
'Sorting',
'Sort an array using bubble sort algorithm.',
'[5,3,1,4]',
'[1,3,4,5]'),

('Selection Sort',
'Easy',
'Sorting',
'Sort an array using selection sort algorithm.',
'[64,25,12,22]',
'[12,22,25,64]'),

('Merge Sort',
'Medium',
'Sorting',
'Sort an array using divide and conquer merge sort.',
'[38,27,43,3]',
'[3,27,38,43]'),

('Quick Sort',
'Medium',
'Sorting',
'Sort an array using quick sort algorithm.',
'[10,7,8,9,1]',
'[1,7,8,9,10]'),

('Heap Sort',
'Hard',
'Sorting',
'Sort an array using heap sort algorithm.',
'[12,11,13,5,6]',
'[5,6,11,12,13]');
INSERT INTO coding_questions
(title, difficulty, topic, description, sample_input, sample_output)
VALUES

('N Queens Problem',
'Hard',
'Backtracking',
'Place N queens on chessboard so no two queens attack each other.',
'N=4',
'2 solutions'),

('Rat in a Maze',
'Medium',
'Backtracking',
'Find all possible paths from start to destination in a maze.',
'4x4 maze',
'Paths found'),

('Sudoku Solver',
'Hard',
'Backtracking',
'Solve a given Sudoku puzzle using backtracking.',
'9x9 Sudoku',
'Completed Sudoku'),

('Subset Generation',
'Medium',
'Backtracking',
'Generate all possible subsets of a given set.',
'[1,2,3]',
'[[],[1],[2],[3]...]'),

('Permutations of String',
'Medium',
'Backtracking',
'Generate all permutations of a string.',
'ABC',
'ABC,ACB,BAC...');
DESC coding_attempts;
SELECT * FROM coding_attempts;
DESC user_coding_progress;
USE placement_portal;
SELECT * FROM user_coding_progress;

SELECT * FROM coding_topics;
INSERT INTO user_coding_progress
(
user_id,
topic_id,
questions_solved,
total_questions,
completion_percentage
)
VALUES

(2,24,5,10,50),

(2,25,4,10,40),

(2,26,3,10,30),

(2,27,2,10,20),

(2,28,6,10,60);
SELECT * FROM user_coding_progress;
DESC aptitude_attempts;
SELECT * FROM aptitude_questions;
SELECT * FROM aptitude_attempts;
USE placement_portal;
DESC coding_questions;
SELECT * FROM coding_questions LIMIT 3;
CREATE TABLE coding_testcases(

    testcase_id INT AUTO_INCREMENT PRIMARY KEY,

    question_id INT NOT NULL,

    input_data TEXT,

    expected_output TEXT,

    FOREIGN KEY(question_id)
    REFERENCES coding_questions(question_id)
);
INSERT INTO coding_testcases
(question_id,input_data,expected_output)

VALUES

(1,'nums=[2,7,11,15], target=9','[0,1]'),

(2,'121','true'),

(3,'hello','olleh');
SELECT * FROM coding_testcases;
CREATE TABLE coding_progress(

    progress_id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    question_id INT NOT NULL,

    status VARCHAR(20),

    language VARCHAR(20),

    attempts INT DEFAULT 1,

    solved_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
SELECT * FROM coding_progress;
INSERT INTO coding_testcases
(question_id,input_data,expected_output)

VALUES

(3,'world','dlrow'),

(3,'python','nohtyp');
SELECT * FROM coding_progress;
INSERT INTO coding_testcases
(question_id,input_data,expected_output)
VALUES

(1,'2,7,11,15 target=9','[0,1]'),

(1,'3,2,4 target=6','[1,2]'),

(2,'121','true'),

(2,'123','false'),

(3,'hello','olleh'),

(3,'world','dlrow');
SELECT * FROM coding_testcases;
SELECT * FROM coding_progress;
DELETE FROM coding_testcases
WHERE question_id=1;
INSERT INTO coding_testcases
(question_id,input_data,expected_output)

VALUES

(1,
'nums=[2,7,11,15], target=9',
'[0,1]');
CREATE TABLE coding_theory_questions (

    id INT AUTO_INCREMENT PRIMARY KEY,

    topic VARCHAR(100),

    question TEXT,

    option_a VARCHAR(255),

    option_b VARCHAR(255),

    option_c VARCHAR(255),

    option_d VARCHAR(255),

    correct_answer VARCHAR(10)

);
INSERT INTO coding_theory_questions
(topic,question,option_a,option_b,option_c,option_d,correct_answer)
VALUES

('Arrays',
'What is the time complexity of accessing an element in an array?',
'O(n)',
'O(1)',
'O(log n)',
'O(n^2)',
'B'),

('Arrays',
'Which data structure stores elements in contiguous memory locations?',
'Linked List',
'Stack',
'Array',
'Tree',
'C'),

('Arrays',
'Which operation takes O(n) time in an array?',
'Accessing element',
'Searching element',
'Adding at beginning',
'Both B and C',
'D'),

('Arrays',
'Index of the first element in an array is usually?',
'-1',
'0',
'1',
'2',
'B'),

('Arrays',
'Which algorithm is commonly used to find maximum subarray sum?',
'Binary Search',
'Kadane Algorithm',
'DFS',
'Bubble Sort',
'B');
INSERT INTO coding_theory_questions
(topic,question,option_a,option_b,option_c,option_d,correct_answer)
VALUES

('Strings',
'Which data type is used to store characters?',
'Integer',
'Float',
'Character',
'Boolean',
'C'),

('Strings',
'Palindrome means a string that?',
'Contains numbers',
'Reads same forward and backward',
'Has spaces',
'Is sorted',
'B'),

('Strings',
'Which method is used to find string length?',
'length()',
'size()',
'count()',
'lenarray()',
'A'),

('Strings',
'Which data structure is used internally for string processing?',
'Array',
'Tree',
'Graph',
'Stack only',
'A'),

('Strings',
'Anagram means two strings have?',
'Same characters with same frequency',
'Same length only',
'Same first letter',
'Same order',
'A');
INSERT INTO coding_theory_questions
(topic,question,option_a,option_b,option_c,option_d,correct_answer)
VALUES

('Linked List',
'What does a node in a linked list contain?',
'Only data',
'Only address',
'Data and address',
'Only index',
'C'),

('Linked List',
'Which type of linked list contains nodes connected in both directions?',
'Singly Linked List',
'Doubly Linked List',
'Circular Linked List',
'Linear List',
'B'),

('Linked List',
'Insertion at the beginning of a linked list takes how much time?',
'O(1)',
'O(n)',
'O(log n)',
'O(n^2)',
'A'),

('Linked List',
'Which pointer indicates the end of a linked list?',
'Start',
'Head',
'Null',
'Middle',
'C'),

('Linked List',
'Which data structure is preferred when frequent insertions and deletions are required?',
'Array',
'Linked List',
'String',
'Tree',
'B');
INSERT INTO coding_theory_questions
(topic,question,option_a,option_b,option_c,option_d,correct_answer)
VALUES

('Stack & Queue',
'Stack follows which principle?',
'FIFO',
'LIFO',
'LILO',
'FILO',
'B'),

('Stack & Queue',
'Queue follows which principle?',
'LIFO',
'FILO',
'FIFO',
'Random',
'C'),

('Stack & Queue',
'Which operation removes an element from stack?',
'Push',
'Insert',
'Pop',
'Add',
'C'),

('Stack & Queue',
'Which data structure is used for function calls?',
'Queue',
'Stack',
'Graph',
'Array',
'B'),

('Stack & Queue',
'Which queue allows insertion and deletion from both ends?',
'Simple Queue',
'Circular Queue',
'Priority Queue',
'Deque',
'D');
INSERT INTO coding_theory_questions
(topic,question,option_a,option_b,option_c,option_d,correct_answer)
VALUES

('Trees',
'A tree data structure consists of?',
'Nodes and edges',
'Only nodes',
'Only arrays',
'Only graphs',
'A'),

('Trees',
'Maximum children of a binary tree node are?',
'1',
'2',
'3',
'Unlimited',
'B'),

('Trees',
'Which traversal visits Root → Left → Right?',
'Inorder',
'Postorder',
'Preorder',
'Level order',
'C'),

('Trees',
'Binary Search Tree maintains which property?',
'Random order',
'Left smaller and right greater',
'All nodes same',
'No ordering',
'B'),

('Trees',
'Which data structure represents hierarchical data?',
'Array',
'Stack',
'Tree',
'Queue',
'C');
INSERT INTO coding_theory_questions
(topic,question,option_a,option_b,option_c,option_d,correct_answer)
VALUES

('Graphs',
'A graph contains which two components?',
'Nodes and edges',
'Stacks and queues',
'Keys and values',
'Arrays and indexes',
'A'),

('Graphs',
'BFS traversal uses which data structure?',
'Stack',
'Queue',
'Array',
'Tree',
'B'),

('Graphs',
'DFS traversal uses which data structure?',
'Queue',
'Stack',
'Heap',
'Linked List',
'B'),

('Graphs',
'A graph with edges having direction is called?',
'Weighted graph',
'Directed graph',
'Simple graph',
'Tree',
'B'),

('Graphs',
'Which algorithm finds shortest path in an unweighted graph?',
'DFS',
'BFS',
'Merge Sort',
'Binary Search',
'B');
INSERT INTO coding_theory_questions
(topic,question,option_a,option_b,option_c,option_d,correct_answer)
VALUES

('Dynamic Programming',
'Dynamic Programming is mainly used to solve problems with?',
'Random solutions',
'Overlapping subproblems',
'Only sorting',
'Only searching',
'B'),

('Dynamic Programming',
'Which technique stores previously calculated results?',
'Memoization',
'Traversal',
'Sorting',
'Hashing',
'A'),

('Dynamic Programming',
'Top-down approach in DP uses?',
'Iteration only',
'Recursion with memoization',
'Only loops',
'Graphs',
'B'),

('Dynamic Programming',
'Which problem is commonly solved using DP?',
'Fibonacci sequence',
'Binary Search',
'Bubble Sort',
'Linear Search',
'A'),

('Dynamic Programming',
'DP improves performance by avoiding?',
'Memory usage',
'Repeated calculations',
'Input values',
'Sorting',
'B');
INSERT INTO coding_theory_questions
(topic,question,option_a,option_b,option_c,option_d,correct_answer)
VALUES

('Searching',
'Which searching algorithm checks elements one by one?',
'Binary Search',
'Linear Search',
'Merge Sort',
'DFS',
'B'),

('Searching',
'Binary search requires data to be?',
'Random',
'Sorted',
'Duplicated',
'Unordered',
'B'),

('Searching',
'Time complexity of binary search is?',
'O(n)',
'O(log n)',
'O(n^2)',
'O(1)',
'B'),

('Searching',
'Which searching algorithm divides the search space into halves?',
'Linear Search',
'Binary Search',
'Bubble Sort',
'DFS',
'B'),

('Searching',
'Searching is used to?',
'Arrange data',
'Find a particular element',
'Delete data',
'Create arrays',
'B');
INSERT INTO coding_theory_questions
(topic,question,option_a,option_b,option_c,option_d,correct_answer)
VALUES

('Sorting',
'Sorting means?',
'Searching data',
'Arranging data in order',
'Deleting data',
'Copying data',
'B'),

('Sorting',
'Which sorting algorithm repeatedly swaps adjacent elements?',
'Merge Sort',
'Bubble Sort',
'Quick Sort',
'Heap Sort',
'B'),

('Sorting',
'Which sorting algorithm uses divide and conquer?',
'Bubble Sort',
'Merge Sort',
'Selection Sort',
'Linear Search',
'B'),

('Sorting',
'Average time complexity of Quick Sort is?',
'O(n)',
'O(n log n)',
'O(n^2)',
'O(1)',
'B'),

('Sorting',
'Which sorting algorithm selects the smallest element repeatedly?',
'Selection Sort',
'Binary Search',
'DFS',
'Insertion Search',
'A');
INSERT INTO coding_theory_questions
(topic,question,option_a,option_b,option_c,option_d,correct_answer)
VALUES

('Backtracking',
'Backtracking is based on which technique?',
'Greedy',
'Recursion',
'Sorting',
'Searching',
'B'),

('Backtracking',
'Backtracking tries solutions and?',
'Never changes them',
'Removes invalid choices',
'Only sorts data',
'Deletes all data',
'B'),

('Backtracking',
'Which problem is solved using backtracking?',
'N Queens',
'Binary Search',
'Bubble Sort',
'Linked List',
'A'),

('Backtracking',
'The main idea of backtracking is?',
'Try all possibilities and undo wrong choices',
'Always choose best option',
'Sort elements',
'Search only once',
'A'),

('Backtracking',
'Backtracking improves search by using?',
'Pruning',
'Hashing',
'Sorting',
'Indexing',
'A');
CREATE TABLE theory_attempts (

    attempt_id INT PRIMARY KEY AUTO_INCREMENT,

    user_id INT NOT NULL,

    topic VARCHAR(100),

    score INT,

    total_questions INT,

    attempt_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
SELECT * FROM theory_attempts;
USE placement_portal;
CREATE TABLE aptitude_mock_questions (

    question_id INT AUTO_INCREMENT PRIMARY KEY,

    question TEXT NOT NULL,

    option_a VARCHAR(255),

    option_b VARCHAR(255),

    option_c VARCHAR(255),

    option_d VARCHAR(255),

    correct_answer CHAR(1),

    difficulty VARCHAR(20)

);
SHOW TABLES;
INSERT INTO aptitude_mock_questions
(question, option_a, option_b, option_c, option_d, correct_answer, difficulty)
VALUES

('What is 25 + 35?', '50', '55', '60', '65', 'C', 'Easy'),

('A train travels 180 km in 3 hours. What is its speed?', '50 km/h', '60 km/h', '70 km/h', '80 km/h', 'B', 'Easy'),

('If x + 12 = 30, then x = ?', '16', '18', '20', '22', 'B', 'Easy'),

('Find the next number in the series: 3, 6, 12, 24, ?', '36', '42', '48', '54', 'C', 'Easy'),

('If 20% of a number is 50, what is the number?', '200', '250', '300', '150', 'B', 'Medium'),

('Which one is different from the others?', 'Rose', 'Lily', 'Lotus', 'Car', 'D', 'Easy'),

('A shopkeeper gives a 10% discount on ₹500. What is the selling price?', '₹450', '₹400', '₹425', '₹475', 'A', 'Easy'),

('If the ratio of boys to girls is 3:2 and there are 30 boys, how many girls are there?', '15', '18', '20', '25', 'C', 'Medium'),

('Choose the correct synonym of "Rapid".', 'Slow', 'Fast', 'Weak', 'Short', 'B', 'Easy'),

('If today is Monday, what day will it be after 10 days?', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'B', 'Medium');

SELECT * FROM aptitude_mock_questions;
USE placement_portal;
CREATE TABLE mock_test_questions (

    question_id INT AUTO_INCREMENT PRIMARY KEY,

    category VARCHAR(50),

    question TEXT,

    option1 VARCHAR(255),

    option2 VARCHAR(255),

    option3 VARCHAR(255),

    option4 VARCHAR(255),

    answer VARCHAR(255)

);
INSERT INTO mock_test_questions
(category, question, option1, option2, option3, option4, answer)
VALUES

('Aptitude','What is 20% of 250?','40','50','60','70','50'),

('Aptitude','If x + 8 = 15, what is x?','5','6','7','8','7'),

('Aptitude','What is the square root of 144?','10','11','12','13','12'),

('Aptitude','A train travels 120 km in 2 hours. What is its speed?','50 km/h','60 km/h','70 km/h','80 km/h','60 km/h'),

('Aptitude','If the ratio of boys to girls is 3:2 and there are 30 boys, how many girls are there?','15','18','20','25','20'),

('Aptitude','Find 25% of 480.','100','110','120','130','120'),

('Aptitude','A shopkeeper gives a 10% discount on ₹500. What is the selling price?','₹450','₹400','₹425','₹475','₹450'),

('Aptitude','If a man completes a work in 10 days, how much work does he complete in one day?','1/5','1/10','1/15','1/20','1/10'),

('Aptitude','The average of 10, 20, 30, 40 and 50 is','20','25','30','35','30'),

('Aptitude','What is 18 × 12?','196','206','216','226','216'),

('Aptitude','If the cost price is ₹800 and selling price is ₹920, what is the profit?','₹100','₹110','₹120','₹130','₹120'),

('Aptitude','Find the next number: 2, 4, 8, 16, ?','20','24','30','32','32'),

('Aptitude','How many degrees are there in a right angle?','45','60','90','180','90'),

('Aptitude','If 5 workers complete a job in 12 days, how many days will 10 workers take?','4','5','6','8','6'),

('Aptitude','A number is divisible by 5 if it ends with','0 or 5','2 or 4','6 or 8','1 or 3','0 or 5');

INSERT INTO mock_test_questions
(category, question, option1, option2, option3, option4, answer)
VALUES

('Coding','Which data structure follows the LIFO principle?','Queue','Stack','Linked List','Tree','Stack'),

('Coding','Which keyword is used to define a function in Python?','function','def','func','define','def'),

('Coding','Which language is primarily used for Android development?','Python','Java','HTML','PHP','Java'),

('Coding','What is the output of 5 + 2 * 3 in C?','21','11','15','10','11'),

('Coding','Which data structure is used for BFS traversal?','Stack','Queue','Tree','Array','Queue'),

('Coding','Which sorting algorithm has the best average time complexity?','Bubble Sort','Selection Sort','Merge Sort','Insertion Sort','Merge Sort'),

('Coding','Which symbol is used to end a statement in Java?','.',',','; ',':',';'),

('Coding','Which HTML tag is used to create a hyperlink?','<img>','<a>','<p>','<link>','<a>'),

('Coding','Which SQL command is used to retrieve records from a table?','GET','SELECT','SHOW','DISPLAY','SELECT'),

('Coding','Which operator is used for equality comparison in Java?','=','= =','==','===','=='),

('Coding','Which of the following is not an OOP principle?','Inheritance','Encapsulation','Polymorphism','Compilation','Compilation'),

('Coding','Which data structure stores elements in key-value pairs?','Array','Stack','HashMap','Queue','HashMap'),

('Coding','What is the extension of a Java source file?','.class','.java','.jar','.js','.java'),

('Coding','Which loop is guaranteed to execute at least once?','for','while','do-while','foreach','do-while'),

('Coding','Which algorithm is commonly used to search a sorted array?','Linear Search','Binary Search','Bubble Sort','DFS','Binary Search');

INSERT INTO mock_test_questions
(category, question, option1, option2, option3, option4, answer)
VALUES

('Company','Which company developed the Java programming language?','Microsoft','Sun Microsystems','Google','IBM','Sun Microsystems'),

('Company','Which data structure is best suited for implementing recursion?','Queue','Stack','Array','Linked List','Stack'),

('Company','What is the full form of SQL?','Structured Query Language','Simple Query Language','Sequential Query Language','Standard Query List','Structured Query Language'),

('Company','Which company is known for conducting the NQT recruitment test?','Infosys','TCS','Wipro','Accenture','TCS'),

('Company','Which HTML tag is used to create a table row?','<td>','<tr>','<th>','<table>','<tr>'),

('Company','Which SQL clause is used to filter records?','ORDER BY','GROUP BY','WHERE','HAVING','WHERE'),

('Company','Which of the following is an operating system?','Oracle','Linux','Python','HTML','Linux'),

('Company','Which company developed the Windows operating system?','Apple','IBM','Microsoft','Google','Microsoft'),

('Company','Which protocol is used to transfer web pages?','FTP','HTTP','SMTP','POP3','HTTP'),

('Company','Which keyword is used to inherit a class in Java?','inherits','extends','implements','super','extends'),

('Company','Which company owns GitHub?','Google','Amazon','Microsoft','Meta','Microsoft'),

('Company','Which SQL function returns the total number of rows?','COUNT()','SUM()','TOTAL()','ROWS()','COUNT()'),

('Company','Which of these is a cloud computing platform?','Visual Studio','Microsoft Azure','Eclipse','NetBeans','Microsoft Azure'),

('Company','Which company developed the React library?','Google','Microsoft','Meta','Oracle','Meta'),

('Which company is headquartered in Bengaluru and is one of Indias largest IT services firms?');

INSERT INTO mock_test_questions
(category, question, option1, option2, option3, option4, answer)
VALUES

('HR','What is the best way to answer the question Tell me about yourself?','Discuss personal life only','Give a professional introduction','Talk only about hobbies','Say I have nothing to say','Give a professional introduction'),

('HR','What should you do before attending an interview?','Reach late','Research the company','Ignore the job description','Do nothing','Research the company'),

('HR','Which quality is most important for teamwork?','Arrogance','Communication','Laziness','Carelessness','Communication'),

('HR','If you do not know the answer to a question in an interview, what should you do?','Guess randomly','Stay silent','Politely admit you are unsure and explain your approach','Leave the interview','Politely admit you are unsure and explain your approach'),

('HR','Why do companies ask about your strengths?','To reject candidates','To understand your abilities','For entertainment','To waste time','To understand your abilities'),

('HR','Which of the following is a professional weakness to mention?','I never learn','I am working on improving my public speaking skills','I do not like work','I avoid responsibility','I am working on improving my public speaking skills'),

('HR','What should you wear for a formal interview?','Casual shorts','Formal attire','Sportswear','Nightwear','Formal attire'),

('HR','How should you answer salary expectation questions as a fresher?','Demand the highest salary','Say any amount is fine','Be flexible and mention company standards','Refuse to answer','Be flexible and mention company standards'),

('HR','What is the purpose of an HR interview?','Only technical evaluation','To assess personality and communication','To test programming only','To check handwriting','To assess personality and communication'),

('HR','What should you do after an interview?','Forget about it','Send a thank-you email if appropriate','Argue with the interviewer','Call repeatedly','Send a thank-you email if appropriate'),

('HR','How should you behave during an interview?','Be confident and polite','Interrupt the interviewer','Use slang','Avoid eye contact','Be confident and polite'),

('HR','Why do you want to join our company?','Because I need money only','Because of the company growth, learning opportunities and career development','My friend works here','No particular reason','Because of the company growth, learning opportunities and career development'),

('HR','What is the best way to handle criticism at work?','Ignore it','Accept it positively and improve','Argue immediately','Blame others','Accept it positively and improve'),

('HR','Which skill is essential for freshers?','Communication','Ignoring deadlines','Avoiding teamwork','Overconfidence','Communication'),

('HR','What is your career goal?','I have no plans','To continuously learn, grow and contribute to the organization','To change jobs every month','To avoid responsibilities','To continuously learn, grow and contribute to the organization');

INSERT INTO mock_test_questions
(category, question, option1, option2, option3, option4, answer)
VALUES

('Placement','What is 15% of 200?','20','25','30','35','30'),

('Placement','Which data structure follows the FIFO principle?','Stack','Queue','Tree','Graph','Queue'),

('Placement','Which SQL command is used to remove all records from a table but keep the table?','DROP','DELETE','TRUNCATE','REMOVE','TRUNCATE'),

('Placement','Which keyword is used to create an object in Java?','this','new','class','object','new'),

('Placement','Which company developed the React JavaScript library?','Google','Microsoft','Meta','Oracle','Meta'),

('Placement','Which protocol is used to send emails?','HTTP','FTP','SMTP','POP3','SMTP'),

('Placement','What is the square root of 225?','10','12','15','20','15'),

('Placement','What is the time complexity of Binary Search?','O(n)','O(log n)','O(n²)','O(1)','O(log n)'),

('Placement','Which operating system is open source?','Windows','Linux','macOS','DOS','Linux'),

('Placement','What should you do if you do not know an interview answer?','Guess randomly','Stay silent','Politely explain your approach','Leave the interview','Politely explain your approach'),

('Placement','Which SQL clause is used to filter rows?','ORDER BY','GROUP BY','WHERE','HAVING','WHERE'),

('Placement','Which HTML tag is used to insert a hyperlink?','<img>','<table>','<a>','<link>','<a>'),

('Placement','Which company conducts the National Qualifier Test (NQT)?','Infosys','TCS','Wipro','Accenture','TCS'),

('Placement','Which OOP concept hides implementation details?','Inheritance','Polymorphism','Abstraction','Compilation','Abstraction'),

('Placement','If a train travels 180 km in 3 hours, what is its speed?','50 km/h','55 km/h','60 km/h','65 km/h','60 km/h');

CREATE TABLE mock_test_attempts (

    attempt_id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT,

    category VARCHAR(50),

    total_questions INT,

    correct_answers INT,

    wrong_answers INT,

    score INT,

    attempted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
USE placement_portal;
DESCRIBE coding_questions;
SELECT * FROM mock_test_questions
WHERE category='Coding';
CREATE TABLE company_mock_questions (

    question_id INT AUTO_INCREMENT PRIMARY KEY,

    company VARCHAR(100) NOT NULL,

    question TEXT NOT NULL,

    option1 VARCHAR(255) NOT NULL,

    option2 VARCHAR(255) NOT NULL,

    option3 VARCHAR(255) NOT NULL,

    option4 VARCHAR(255) NOT NULL,

    answer VARCHAR(255) NOT NULL

);
INSERT INTO company_mock_questions
(company, question, option1, option2, option3, option4, answer)
VALUES

('TCS','What is the output of 10 % 3?','1','2','3','0','1'),

('TCS','Which data structure works on FIFO?','Stack','Queue','Tree','Graph','Queue'),

('TCS','Which keyword is used to create a class in Java?','define','class','struct','new','class'),

('TCS','Which SQL command is used to remove a table?','DELETE','REMOVE','DROP','CLEAR','DROP'),

('TCS','Which company developed Java?','Google','Microsoft','Sun Microsystems','IBM','Sun Microsystems'),

('TCS','Which searching algorithm works only on sorted arrays?','Linear Search','Binary Search','DFS','BFS','Binary Search'),

('TCS','Which HTML tag creates a table row?','<td>','<tr>','<table>','<th>','<tr>'),

('TCS','Which symbol is used for comments in C?','//','##','<!-- -->','**','//'),

('TCS','Which OOP principle hides implementation details?','Inheritance','Encapsulation','Polymorphism','Abstraction','Encapsulation'),

('TCS','Which SQL clause sorts records?','ORDER BY','GROUP BY','SORT','FILTER','ORDER BY');