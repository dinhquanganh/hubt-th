const data = [
  { name: "Chủ nghĩa xã hội khoa học", credits: 2 },
  { name: "Cơ sở dữ liệu quan hệ", credits: 2 },
  { name: "Đồ án phần mềm C++", credits: 2 },
  { name: "HA3", credits: 3 },
  { name: "Kiến trúc máy tính", credits: 2 },
  { name: "Lập trình C++ cơ sở", credits: 2 },
  { name: "Phân tích và thiết kế hệ thống", credits: 2 },
  { name: "Project, Web và NetWork", credits: 4 },
  { name: "Quản trị cơ sở dữ liệu", credits: 2 },
  { name: "Cấu trúc dữ liệu và giải thuật", credits: 4 },
  { name: "HA4", credits: 3 },
  { name: "ASP/JS/PHP", credits: 4 },
  { name: "Lập trình hướng đối tượng", credits: 2 },
  { name: "Mạng máy tính", credits: 2 },
  { name: "Lập trình trực quan", credits: 4 },
];
let $bodyData = document.querySelector(".body-data");
let $creditScoreElement = document.getElementsByClassName("credit-score");
let $scoreElement = document.getElementsByClassName("score");
let $yearAverage = document.querySelector("#year-average");

((data) => {
  for (let item of data) {
    $bodyData.innerHTML += `
            <tr>
              <td style="min-width: 300px">${item.name}</td>
              <td class="credits">${item.credits}</td>
              <td><input type="number" name="score" class="form-control score" max="10" min="0"/></td>
              <td class="credit-score"></td>
            </tr>`;
  }
  calculateCreditScore();
  $yearAverage.innerText = calculateYearAverage();
})(data);

function calculateCreditScore() {
  for (let item of $creditScoreElement) {
    item.innerHTML = (
      Number(item.parentElement.children[1].textContent) *
      Number(item.parentElement.children[2].children[0].value)
    ).toFixed(1);
  }
}

function calculateYearAverage() {
  let totalCredits = 0;
  for (let item of data) {
    totalCredits += item.credits;
  }
  let totalCreditScore = 0;
  for (let item of $creditScoreElement) {
    totalCreditScore += Number(item.textContent);
  }
  return (totalCreditScore / totalCredits).toFixed(1);
}

for (let item of $scoreElement) {
  item.addEventListener("keyup", (e) => {
    if (e.key === "e") item.value = "";
    if (item.value < 0 || item.value > 10) {
      item.value = 0;
      calculateCreditScore();
      $yearAverage.innerText = calculateYearAverage();
    }
    calculateCreditScore();
    $yearAverage.innerText = calculateYearAverage();
  });
  item.addEventListener("blur", () => {
    item.value = Number(item.value);
    if (item.value < 0 || item.value > 10 || isNaN(item.value)) item.value = 0;
    item.value = Number(item.value).toFixed(1);
    calculateCreditScore();
    $yearAverage.innerText = calculateYearAverage();
  });
}
