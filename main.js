function calculateBmi() {
  const berat = document.getElementById("berat").value;
  const tinggi = document.getElementById("tinggi").value;

  const numBerat = parseFloat(berat);
  const numTinggi = parseFloat(tinggi);

  const konversTinggi = numTinggi / 100;

  const hasilBmi = numBerat / konversTinggi ** 2;

  if (hasilBmi < 18.5) {
    document.getElementById("result").textContent = "Berat Anda Kurang";
  } else if (hasilBmi >= 18.5 && hasilBmi < 25) {
    document.getElementById("result").textContent = "Berat Badan Anda Ideal";
  } else if (hasilBmi >= 25 && hasilBmi < 30) {
    document.getElementById("result").textContent =
      "Anda Kelebihan Berat Badan";
  } else if (hasilBmi >= 30) {
    document.getElementById("result").textContent = "Anda Obesitas";
  }
}
