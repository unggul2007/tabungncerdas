const hari = ["Senin","Selasa","Rabu","Kamis","Jumat","Sabtu","Minggu"];

document.getElementById("nama").innerText =
  localStorage.getItem("user");

let total = Number(localStorage.getItem("total")) || 0;
document.getElementById("total").innerText = total;

let data = JSON.parse(localStorage.getItem("jadwal")) || {};

const tbody = document.getElementById("jadwal");

hari.forEach(h => {
  if (!data[h]) data[h] = { jumlah: 0, cek: false };

  tbody.innerHTML += `
    <tr>
      <td>${h}</td>
      <td>
        <input type="number" value="${data[h].jumlah}"
        onchange="ubah('${h}', this.value)">
      </td>
      <td>
        <input type="checkbox"
        ${data[h].cek ? "checked disabled":""}
        onclick="centang('${h}')">
      </td>
    </tr>
  `;
});

function ubah(h, v) {
  data[h].jumlah = Number(v);
  simpan();
}

function centang(h) {
  if (!data[h].cek) {
    total += data[h].jumlah;
    data[h].cek = true;
    localStorage.setItem("total", total);
    document.getElementById("total").innerText = total;
    simpan();
    location.reload();
  }
}

function simpan() {
  localStorage.setItem("jadwal", JSON.stringify(data));
}

function setTema(t) {
  document.body.className = t;
  localStorage.setItem("tema", t);
}

document.body.className =
  localStorage.getItem("tema") || "light";
