function update_captions(){
  if(window.innerWidth < 520){
    captions = ["Coffee", "<span style='font-size:11px;display:inline-block;line-height:11px;vertical-align:middle'>Instant Noodles",
      "Words", "Problems",
      "<span style='display:inline-block;line-height:11px;vertical-align:middle'>TAKE TOEFL</span>",
      "<span style='font-size:11px;display:inline-block;line-height:11px;vertical-align:middle'>TAKE GRE</span>",
      "<span style='font-size:11px'>LAB</span>", "Paper",
      "<span style='font-size:11px'>Conference</span>", "Swap", "Recommendation Letter",
      "<span style='font-size:smaller'>STRONG RL</span>",
      "<span style='font-size:smaller'>Rej</span>", "Offer", "Standford!"];
    captions_rel = ["<span style='font-size:9px;'>Relationship</span>",
      "<span style='font-size:11px;'>Break-up</span>"];
  }
  else{
    captions = ["Coffee", "<span style='font-size:24px;display:inline-block;line-height:24px;vertical-align:middle'>Instant Noodles</span>",
      "Words", "Problems",
      "<span style='font-size:24px;display:inline-block;line-height:24px;vertical-align:middle'>TAKE TOEFL</span>",
      "<span style='font-size:20px;display:inline-block;line-height:20px;vertical-align:middle'>TAKE GRE</span>",
      "<span style='font-size:20px'>LAB</span>", "Paper",
      "<span style='font-size:20px'>Conference</span>", "Swap", "Recommendation Letter",
      "<span style='font-size:smaller'>STRONG RL</span>",
      "<span style='font-size:smaller'>Rej</span>", "Offer", "Standford!"];
    captions_rel = ["<span style='font-size:15px;'>Relationship</span>",
      "<span style='font-size:20px;'>Break-up</span>"];
  }
}

var span_en;

function create_switch_en(){
  span_en = document.createElement('div');
  span_en.style.position = "absolute";
  span_en.style.top = "0";
  if(window.innerWidth < 520)
    span_en.style.fontSize = "10px";
  else
    span_en.style.fontSize = "small";
  span_en.style.backgroundColor = "#8f7a66";
  span_en.style.borderRadius = "0 0 3px 3px";
  span_en.style.padding = "3px 10px";
  span_en.style.color = "white";
  span_en.style.cursor = "pointer";
  span_en.onclick = play_in_english;
  span_en.textContent = "🇬🇧 Switch to English";
  var container = document.querySelector('.container');
  container.insertBefore(span_en, container.firstChild);
}

var span_zh;

function create_switch_zh(){
  span_zh = document.createElement('div');
  span_zh.style.position = "absolute";
  span_zh.style.top = "0";
  if(window.innerWidth < 520)
    span_zh.style.fontSize = "10px";
  else
    span_zh.style.fontSize = "small";
  span_zh.style.backgroundColor = "#8f7a66";
  span_zh.style.borderRadius = "0 0 3px 3px";
  span_zh.style.padding = "3px 10px";
  span_zh.style.color = "white";
  span_zh.style.cursor = "pointer";
  span_zh.onclick = play_in_chinese;
  span_zh.textContent = "中文版";
  var container = document.querySelector('.container');
  container.insertBefore(span_zh, container.firstChild);
}

function play_in_english(){
  update_captions();
  window.addEventListener('resize', update_captions, true);

  caption_garbage = "<span style='font-size:smaller'>Failed Exams</span>";
  window.game.actuate();

  game_title = "PhD";
  game_alt_title = "Love";
  result_msg = "You got a ";
  var titleElem = document.getElementById('title');
  if(titleElem.textContent != "Love") titleElem.textContent = game_title;
  document.querySelector('.restart-button').textContent = "Drop out";
  document.querySelector('.retry-button').textContent = "Try again";
  document.querySelector('.game-explanation').innerHTML = "<strong class='important'>How to play:</strong> Use your <strong>arrow keys</strong> to move the bricks. When two bricks of the same type touch, they <strong>merge into one!</strong><br>However, your ideas and experiments may not always work &mdash; they may produce the sticky <strong>garbage</strong>, which is resistant to moves. Two garbage bricks vanish when they touch. You will stop producing garbage after getting a <strong>paper</strong> (except for one more piece to help you eliminate any existing garbage).<br>A <strong>relationship</strong> upgrades any brick it touches for the first time. The brick shows the number of times you have benefited from it. When the 10-sec relationship ends, it will become a <strong>break-up</strong> (or garbage if you didn't use it), which downgrades bricks until you have repaid the benefits.";

  if(span_en) span_en.parentNode.removeChild(span_en);
  create_switch_zh();
  window.game.storageManager.storage.setItem('lang', 'en');
}

var zh_var = null;

function determine_zh_var(){
  if(zh_var) return zh_var;
  var hant_locales = ['zh-hant', 'zh-tw', 'zh-hk', 'zh-mo'];
  var nav_langs = navigator.languages;
  var hant_fallback = false;
  if(nav_langs){
    for(var i=0; i<nav_langs.length; i++){
      var nav_lang = nav_langs[i].toLowerCase();
      if(nav_lang.startsWith('zh-')){
        zh_var = hant_locales.indexOf(nav_lang) >= 0 ? "hant" : "hans";
        break;
      }
      else if(nav_lang.startsWith('ja-') || nav_lang.startsWith('ko-')) hant_fallback = true;
    }
  }
  else{
    var nav_lang = navigator.language || navigator.userLanguage;
    if(nav_lang){
      nav_lang = nav_lang.toLowerCase();
      if(nav_lang.startsWith('zh-'))
        zh_var = hant_locales.indexOf(nav_lang) >= 0 ? "hant" : "hans";
      else if(nav_lang.startsWith('ja-') || nav_lang.startsWith('ko-')) hant_fallback = true;
    }
  }
  if(!zh_var) zh_var = hant_fallback ? "hant" : "hans";
  return zh_var;
}

function use_simplified(){
  captions = ["Coffee", "泡面",
    "背单词", "刷机经", "<span style='display:inline-block;line-height:30px;vertical-align:middle'>考TOEFL</span>", "考GRE",
    "做科研", "Paper", "去参会", "交换", "推荐信",
    "牛推", "Rej", "Offer", "Standford!"];
  captions_rel = ["恋爱", "分手"];
  caption_garbage = "<span style='display:inline-block;line-height:30px;vertical-align:middle'>被其他中介坑了</span>";
  game_alt_title = "爱";
  window.game.actuate();

  document.querySelector('.restart-button').textContent = "退学创业";
  document.querySelector('.retry-button').textContent = "我要选择繁星留学！";
  document.querySelector('.game-explanation').innerHTML = "<strong class='important'>留学路漫漫，繁星伴你行：</strong> 由PHD 2048改版而来。作者：繁星留学CEO & Carnegie Mellon University - Silicon Valley MSSM WildSaoFeng Lynch。分布全球的同伴导师，更亲切的交流方式，用心辅导每位同学的留学，欢迎关注公司公众号&咨询产品！申请季加油，都是这么过来的，祝大家Offer满满！代码改了一小时左右，如果有BUG欢迎反馈。各级：Coffee - 泡面 - 背单词 - 刷机经 - 考TOEFL - 考GRE - 做科研 - Paper - 去参会 - 交换 - 推荐信 - 牛推 - Rej - Offer - Stanford!（希望学校不会找我喝茶hhh）";
}

function use_traditional(){
  captions = ["Coffee", "泡面",
    "背单词", "刷机经", "<span style='display:inline-block;line-height:30px;vertical-align:middle'>考TOEFL</span>", "考GRE",
    "做科研", "Paper", "去参会", "交换", "推荐信",
    "牛推", "Rej", "Offer", "Standford!"];
  captions_rel = ["恋爱", "分手"];
  caption_garbage = "<span style='display:inline-block;line-height:30px;vertical-align:middle'>被其他中介坑了</span>";
  game_alt_title = "爱";
  window.game.actuate();

  document.querySelector('.restart-button').textContent = "退学创业";
  document.querySelector('.retry-button').textContent = "善";
  document.querySelector('.game-explanation').innerHTML = "<strong class='important'>留学路漫漫，繁星伴你行：</strong> 由PHD 2048改版而来。作者：繁星留学CEO & Carnegie Mellon University - Silicon Valley MSSM WildSaoFeng Lynch。分布全球的同伴导师，更亲切的交流方式，用心辅导每位同学的留学，欢迎关注公司公众号&咨询产品！申请季加油，都是这么过来的，祝大家Offer满满！代码改了一小时左右，如果有BUG欢迎反馈。各级：Coffee - 泡面 - 背单词 - 刷机经 - 考TOEFL - 考GRE - 做科研 - Paper - 去参会 - 交换 - 推荐信 - 牛推 - Rej - Offer - Stanford!（希望学校不会找我喝茶hhh）";

  document.body.style.fontFamily = '"Clear Sans", "Helvetica Neue", Arial, "Hiragino Sans CNS", "PingFang TC", "Microsoft JhengHei", "Source Han Sans TC", "Noto Sans CJK TC", sans-serif';
}

function play_in_chinese(){
  window.removeEventListener('resize', update_captions, true);
  game_title = "艰难留学路 | 繁星伴你行";
  result_msg = "你得到了";
  var titleElem = document.getElementById('title');
  if(titleElem.textContent != "Love") titleElem.textContent = game_title;

  if(determine_zh_var() == 'hant') use_traditional();
  else use_simplified();

  if(span_zh) span_zh.parentNode.removeChild(span_zh);
  create_switch_en();
  window.game.storageManager.storage.setItem('lang', 'zh');
}
