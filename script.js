const checkItems = [
  { id: "q1", text: "何のチラシか3秒でわかる", hint: "タイトルを大きくし、1行目で内容がわかる言葉にしましょう。" },
  { id: "q2", text: "誰に向けたチラシか明確", hint: "『○○な方へ』のように対象者をはっきり書くと伝わりやすいです。" },
  { id: "q3", text: "一番伝えたいことが目立っている", hint: "強調は1つにしぼり、サイズや色で優先順位をつけましょう。" },
  { id: "q4", text: "日時・場所・料金など必要情報が探しやすい", hint: "情報をかたまりで整理し、見出しをつけると読みやすくなります。" },
  { id: "q5", text: "問い合わせや申込み方法がわかりやすい", hint: "電話・LINE・フォームなど、行動方法を1か所にまとめましょう。" },
  { id: "q6", text: "文字が小さすぎない", hint: "本文は最低でも10.5〜12pt程度を目安にし、詰め込みすぎを避けましょう。" },
  { id: "q7", text: "色や装飾が多すぎない", hint: "使う色を2〜3色に絞ると、落ち着いて見やすい印象になります。" },
  { id: "q8", text: "写真やイラストが内容に合っている", hint: "きれいさより『伝えたい内容と合うか』を優先して選びましょう。" },
  { id: "q9", text: "読んだ人が次に何をすればいいかわかる", hint: "『今すぐ予約』『まずはお問い合わせ』など、次の行動を明確に。" },
  { id: "q10", text: "信頼感や安心感がある", hint: "実績・運営者情報・お客様の声などがあると安心感につながります。" }
];

const checkList = document.getElementById("checkList");
const resultBtn = document.getElementById("resultBtn");
const resetBtn = document.getElementById("resetBtn");
const resultArea = document.getElementById("resultArea");
const scoreText = document.getElementById("scoreText");
const levelText = document.getElementById("levelText");
const adviceList = document.getElementById("adviceList");

function renderChecks() {
  const fragment = document.createDocumentFragment();

  checkItems.forEach((item, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "check-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = item.id;
    checkbox.name = item.id;

    const label = document.createElement("label");
    label.htmlFor = item.id;
    label.textContent = `${index + 1}. ${item.text}`;

    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);
    fragment.appendChild(wrapper);
  });

  checkList.appendChild(fragment);
}

function judgeLevel(score, total) {
  const ratio = score / total;

  if (ratio >= 0.8) {
    return { text: "とても伝わりやすい状態です！", color: "var(--ok)" };
  }
  if (ratio >= 0.5) {
    return { text: "あと一歩でさらに伝わります。", color: "var(--mid)" };
  }
  return { text: "改善すると、もっと伝わりやすくなります。", color: "var(--low)" };
}

function showResult() {
  const checkedIds = checkItems
    .filter((item) => document.getElementById(item.id).checked)
    .map((item) => item.id);

  const score = checkedIds.length;
  const total = checkItems.length;
  const level = judgeLevel(score, total);

  scoreText.textContent = `${score} / ${total} 点`;
  levelText.textContent = level.text;
  levelText.style.color = level.color;

  const unchecked = checkItems.filter((item) => !checkedIds.includes(item.id));
  adviceList.innerHTML = "";

  if (unchecked.length === 0) {
    const li = document.createElement("li");
    li.textContent = "すべてクリアです！この調子で最終チェックして配布しましょう。";
    adviceList.appendChild(li);
  } else {
    unchecked.slice(0, 4).forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.hint;
      adviceList.appendChild(li);
    });
  }

  resultArea.classList.remove("hidden");
  resultArea.scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetForm() {
  resultArea.classList.add("hidden");
  scoreText.textContent = "";
  levelText.textContent = "";
  adviceList.innerHTML = "";
}

renderChecks();
resultBtn.addEventListener("click", showResult);
resetBtn.addEventListener("click", resetForm);
