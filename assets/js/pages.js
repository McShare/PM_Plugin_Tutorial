/* 
Page downloader & switcher to make code cleaner.
By (c) Ad5001 2016
*/

articles = document.getElementsByTagName("article");
console.log(articles);
/*l = location.pathname.split("/");
l[l.length - 1] = undefined;
dir = l.join("/");*/
for (i = 0; i < articles.length; i++) {
    console.log("pages/" + articles[i].id + ".html");
    $.get("pages/" + articles[i].id + ".html", function(responseText) {
        setPage(responseText);
    });
}


function setPage(text) {
    page = text.substr(5).split(" -->")[0]; // Temporary working solution
    document.getElementById(page).innerHTML = text + '<div class="close" onclick="location.hash=\'\';">Close</div>';
    if (page == "quiz") {
        /*
Quiz maker
By (c) Ad5001 2016
*/

        QandA = [{
                question: "你应该把你插件的主要文件放在哪里?",
                a: "在src文件夹或src / 你的名称文件夹中",
                b: "在你的名称 / SRC文件夹",
                c: "在你的资源文件夹",
                valid: "1"
            },
            {
                question: "如何在控制台上记录消息?",
                a: "$this->info('My message');",
                b: "$this->getLogger()->info(My message);",
                c: "$this->getLogger()->info('My message');",
                valid: "3"
            },
            {
                question: "命令的发送方的class是什么？",
                a: "\\pocketmine\\command\\CommandSender",
                b: "\\pocketmine\\command\\CmdSender",
                c: "\\pocketmine\\Player",
                valid: "1"
            },
            {
                question: "如何保存插件配置？",
                a: "$this->getConfig()->reload();",
                b: "$this->saveConifg();",
                c: "$this->getConfig()->save();",
                valid: "3"
            },
            {
                question: "一个tick是多久？",
                a: "20 ticks = 1/20秒",
                b: "20 ticks = 1秒",
                c: "20 ticks = 20秒",
                valid: "2"
            },
            {
                question: "哪个方法被用来检测一个正数？",
                a: "is_number",
                b: "is_int",
                c: "is_float",
                valid: "2"
            },
            {
                question: "应该扩展哪个class来完成task?",
                a: "pocketmine\plugin\PluginTask",
                b: "pocketmine\scheduler\Task",
                c: "pocketmine\scheduler\PluginTask"
            },
                 {
                     question: "（至更高级的开发者）我们如何称呼这种PHP方式",
                     a: "OOP (Oriented Object Programming)",
                     b: "OPP (Object Programming Possibility)",
                     c: "OOP (Object Oriented Programming",
                     valid: 3
                 }
        ]

        quizStep = -1;
        score = 0;
        question = document.getElementById("question");
        answers = [document.getElementById("answer1"), document.getElementById("answer2"), document.getElementById("answer3")];
        nextQuestion();


    }
}

function quizValidate(num) {
    if (typeof QandA[quizStep + 1] == "undefined") {
        alert("你的分数是：" + (score / quizStep * 100) + "%");
        quizStep = -1;
        nextQuestion();
        score = 0;
        location.hash = "#";
        return;
    }
    if (num == QandA[quizStep].valid) {
        score++;
        answers[num - 1].style.backgroundColor = "lime";
    } else {
        answers[num - 1].style.backgroundColor = "red";
    }
    setTimeout(function() {
        nextQuestion();
        answers[num - 1].style.backgroundColor = "lightgray";
    }, 2000);
}

function nextQuestion() {
    quizStep++;
    question.innerHTML = QandA[quizStep].question;
    answers[0].innerHTML = QandA[quizStep].a;
    answers[1].innerHTML = QandA[quizStep].b;
    answers[2].innerHTML = QandA[quizStep].c;
}
