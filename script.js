const postBtn = document.getElementById("postBtn");
const wall = document.getElementById("wall");

let wishes = JSON.parse(localStorage.getItem("wishes")) || [];

// 渲染全部愿望
function renderAll() {
  wall.innerHTML = "";
  wishes.forEach((wish, index) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <strong>${wish.name}</strong>
      <p>${wish.text}</p>
    `;

    if (wish.fileURL) {
      if (wish.fileType.startsWith("image")) {
        const img = document.createElement("img");
        img.src = wish.fileURL;
        card.appendChild(img);
      } else if (wish.fileType.startsWith("video")) {
        const video = document.createElement("video");
        video.src = wish.fileURL;
        video.controls = true;
        card.appendChild(video);
      }
    }

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑️";
    delBtn.className = "delete-btn";
    delBtn.title = "删除这条愿望";

    delBtn.onclick = () => {
      if (confirm("确定要回收这个愿望吗？")) {
        wishes.splice(index, 1);
        localStorage.setItem("wishes", JSON.stringify(wishes));
        renderAll();
      }
    };

    card.appendChild(delBtn);
    wall.appendChild(card);
  });
}

// 发布
postBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value || "匿名";
  const text = document.getElementById("wish").value;
  const file = document.getElementById("media").files[0];

  if (!text && !file) {
    alert("请至少写一句话或上传图片/影片");
    return;
  }

  const wish = {
    name,
    text,
    fileURL: file ? URL.createObjectURL(file) : null,
    fileType: file ? file.type : null
  };

  wishes.unshift(wish);
  localStorage.setItem("wishes", JSON.stringify(wishes));

  document.getElementById("wish").value = "";
  document.getElementById("media").value = "";

  renderAll();
});

renderAll();