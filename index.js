require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const chatCompletion = async (messages, model = "gpt-3.5-turbo") => {
    await openai.createChatCompletion({
        model: model,
        messages: messages,
        temperature: 0.9,
        max_tokens: 60,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    })
        .then((res) => {
            console.log('--------chatCompletion result---------')
            console.log(res.data.choices[0].message)
        })
        .catch((err) => console.log('>>Error chat completion', err))

}


const textCompletion = async (prompt, model = "text-davinci-003") => {
    await openai.createCompletion({
        model: model,
        prompt: prompt,
        temperature: 0.9,
        max_tokens: 60,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    })
        .then((res) => {
            console.log('--------textCompletion result---------')
            console.log(res.data.choices[0])
        })
        .catch((err) => console.log('>>Error text completion', err))
}

//--------------------------Translate---------------------------------------------
// const text = "Hello everyone";
// textCompletion(`Translate the following English text to French: "${text}"`)
// // chatCompletion([
// //     { "role": "system", "content": "You are a helpful assistant that translates English to French." },
// //     { "role": "user", "content": `Translate the following English text to French: "${text}"` }
// // ])
// chatCompletion([
//     { "role": "user", "content": `Translate the following English text to French: "${text}"` }
// ])

//--------------------------Extract keyword---------------------------------------------
const sentences = `Extract keywords from this text:\n\nBlack-on-black ware is a 20th- and 21st-century pottery tradition developed by the Puebloan Native American ceramic artists in Northern New Mexico. Traditional reduction-fired blackware has been made for centuries by pueblo artists. Black-on-black ware of the past century is produced with a smooth surface, with the designs applied through selective burnishing or the application of refractory slip. Another style involves carving or incising designs and selectively polishing the raised areas. For generations several families from Kha'po Owingeh and P'ohwhóge Owingeh pueblos have been making black-on-black ware with the techniques passed down from matriarch potters. Artists from other pueblos have also produced black-on-black ware. Several contemporary artists have created works honoring the pottery of their ancestors.`;
textCompletion(sentences);
chatCompletion([
    { "role": "user", "content": sentences }
])