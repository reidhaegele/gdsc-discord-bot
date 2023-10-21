// import dotenv from 'dotenv'
const dotenv = require('dotenv');
dotenv.config()

// import { Client, GatewayIntentBits } from 'discord.js'
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.login(process.env.DISCORD_TOKEN);


const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");

const MODEL_NAME = "models/chat-bison-001";
const API_KEY = process.env.PALM_TOKEN;

const gClient = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

const context = "";
const examples = [
  {
    "input": {
      "content": "What is GDSC?"
    },
    "output": {
      "content": "GDSC stands for Google Developer Student Clubs. It is a global program for university students passionate about technology. GDSCs provide students with opportunities to learn about Google technologies, develop their skills, and connect with other developers.\n\nGDSCs are open to all university students, regardless of their major or experience level. Members of GDSCs can participate in a variety of activities, including:\n\n* Learning about Google technologies\n* Developing their skills through hackathons, workshops, and other events\n* Networking with other developers\n* Giving back to their community through tech education and outreach\n\nGDSCs are led by student leaders who are passionate about technology and want to make a difference in their community. Student leaders are responsible for planning and organizing GDSC activities, as well as recruiting new members.\n\nIf you are a university student interested in learning more about Google technologies and developing your skills, I encourage you to join a GDSC near you. You can find more information about GDSCs on the Google Developers website."
    }
  },
  {
    "input": {
      "content": "What is GDSC S&T?"
    },
    "output": {
      "content": "GDSC S&T stands for Google Developer Student Clubs Missouri S&T. It is an S&T campus organization for university students passionate about technology. GDSCs provide students with opportunities to learn about Google technologies, develop their skills, and connect with other developers.\n\nGDSC S&T is open to all S&T students, regardless of their major or experience level. Members of GDSCs can participate in a variety of activities, including:\n\n* Learning about Google technologies\n* Developing their skills through hackathons, workshops, and other events\n* Networking with other developers\n* Giving back to their community through tech education and outreach\n\nGDSC S&T is led by S&T student leaders who are passionate about technology and want to make a difference in their community. Student leaders are responsible for planning and organizing GDSC S&T activities, as well as recruiting new members.\n\nIf you are an S&T student interested in learning more about Google technologies and developing your skills, I encourage you to join GDSC S&T. You can find more information about GDSCs on the Google Developers website."
    }
  },
  {
    "input": {
      "content": "How is Missouri S&T related to GDSC S&T?"
    },
    "output": {
      "content": "Missouri S&T is a public research university located in Rolla, Missouri. It is one of the nation's leading engineering schools and is also home to a strong computer science program. GDSC S&T is a Google Developer Student Club that is affiliated with Missouri S&T. The club provides students with opportunities to learn about Google technologies, develop their skills, and connect with other developers.\n\nGDSC S&T is led by student leaders who are passionate about technology and want to make a difference in their community. Student leaders are responsible for planning and organizing GDSC S&T activities, as well as recruiting new members.\n\nGDSC S&T is a great way for students to learn about Google technologies and develop their skills. The club also provides students with opportunities to network with other developers and give back to their community. If you are a student at Missouri S&T and are interested in learning more about Google technologies, I encourage you to join GDSC S&T. You can find more information about GDSC S&T on the Google Developers website.\n\nHere are some of the ways that Missouri S&T is related to GDSC S&T:\n\n* GDSC S&T is affiliated with Missouri S&T.\n* GDSC S&T is led by student leaders who are students at Missouri S&T.\n* GDSC S&T provides opportunities for students at Missouri S&T to learn about Google technologies, develop their skills, and connect with other developers.\n* GDSC S&T is a great way for students at Missouri S&T to learn about Google technologies and develop their skills.\n* GDSC S&T also provides students at Missouri S&T with opportunities to network with other developers and give back to their community."
    }
  },
  {
    "input": {
      "content": "Who runs GDSC S&T?"
    },
    "output": {
      "content": "GDSC S&T is led by student leaders who are passionate about technology and want to make a difference in their community. Student leaders are responsible for planning and organizing GDSC S&T activities, as well as recruiting new members.\n\nThe current President and Vice President is Reid Haegele and Connor Hallemann, respectively. There are also student leaders in the positions of Development Lead, Treasurer, and Public Relations Lead."
    }
  },
  {
    "input": {
      "content": "What is the team structure of GDSC S&T?"
    },
    "output": {
      "content": "GDSC S&T is led by student leaders who are passionate about technology and want to make a difference in their community. Student leaders are responsible for planning and organizing GDSC S&T activities, as well as recruiting new members.\n\nThe top down structure is as follows: President, then Vice President, then Development Lead, Treasurer, and Public Relations Lead, then the team members of the Development Team and Public Relations Team."
    }
  },
  {
    "input": {
      "content": "What are the two teams in GDSC S&T?"
    },
    "output": {
      "content": "The two teams in GDSC S&T are the Development Team and the Public Relations Team.\n\nThe Development Team is responsible for planning and organizing GDSC S&T's technical events, such as hackathons and workshops. They also work on developing and maintaining GDSC S&T's website and social media presence.\n\nThe Public Relations Team is responsible for promoting GDSC S&T to the Missouri S&T community. They also work on building relationships with other student organizations and businesses.\n\nBoth teams are essential to the success of GDSC S&T. The Development Team ensures that GDSC S&T provides its members with opportunities to learn and grow as developers. The Public Relations Team helps to spread the word about GDSC S&T and its activities, and to build a strong community around the club."
    }
  }
];
const messages = [];

client.on("messageCreate", async (message) => {
    console.log(message)

    if (message?.channelId == "1165174455237095535" && !message?.author.bot)
    {
        messages.push({ "content": message.content });

        gClient.generateMessage({
            // required, which model to use to generate the result
            model: MODEL_NAME,
            // optional, 0.0 always uses the highest-probability result
            temperature: 0.25,
            // optional, how many candidate results to generate
            candidateCount: 1,
            // optional, number of most probable tokens to consider for generation
            top_k: 40,
            // optional, for nucleus sampling decoding strategy
            top_p: 0.95,
            prompt: {
                // optional, sent on every request and prioritized over history
                context: context,
                // optional, examples to further finetune responses
                examples: examples,
                // required, alternating prompt/response messages
                messages: messages,
            },
        }).then(result => {
            // console.log(JSON.stringify(result, null, 2));
            respone_text = result[0].candidates[0].content;
            console.log(respone_text);
            message.author.send(respone_text);
        });
        
    }
});