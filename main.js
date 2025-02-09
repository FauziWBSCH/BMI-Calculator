async function calculateBmi() {
  const berat = document.getElementById("berat").value;
  const tinggi = document.getElementById("tinggi").value;
  const jenis_kelamin = document.getElementById("jenis_kelamin").value;

  const API_KEY = "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";

  function typeWriter(text, element, speed = 50) {
    let i = 0;
    element.textContent = ""; // Kosongkan elemen sebelum memulai animasi
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed); // Atur kecepatan mengetik (dalam milidetik)
      }
    }
    type();
  }

  if (
    jenis_kelamin === "pick" ||
    berat === "" ||
    tinggi === "" ||
    berat <= 0 ||
    tinggi <= 0
  ) {
    alert("Harap isi semua kolom dengan benar sebelum menghitung BMI!");
    return;
  }

  const numBerat = parseFloat(berat);
  const numTinggi = parseFloat(tinggi);

  const konversTinggi = numTinggi / 100;
  const hasilBmi = numBerat / konversTinggi ** 2;
  const printHasil = hasilBmi.toFixed(1);

  document.getElementById("berat_badan").textContent = `${numBerat} Kg`;

  let kategori = "";
  if (hasilBmi < 18.5) {
    kategori = "UnderWeight";
  } else if (hasilBmi >= 18.5 && hasilBmi < 25) {
    kategori = "Berat Badan Ideal";
  } else if (hasilBmi >= 25 && hasilBmi < 30) {
    kategori = "Kelebihan Berat Badan";
  } else if (hasilBmi >= 30) {
    kategori = "Obesitas";
  }

  document.getElementById("result_bmi").textContent = `${printHasil}`;
  document.getElementById("result_kategori").textContent = kategori;

  let ideal = 0;
  if (jenis_kelamin === "pria") {
    ideal = numTinggi - 100 - ((numTinggi - 100) * 10) / 100;
  } else if (jenis_kelamin === "perempuan") {
    ideal = numTinggi - 100 - ((numTinggi - 100) * 15) / 100;
  }

  ideal = Math.round(ideal);
  document.getElementById("return_ideal").textContent = `${ideal} Kg`;

  let rekomendasi = "";
  let queryAI = "";

  if (numBerat > ideal) {
    const turun = numBerat - ideal;
    rekomendasi = `Turunkan sekitar ${turun} Kg`;
    queryAI = "5 Cara menurunkan berat badan (jawab secara singkat saja)";
  } else if (numBerat < ideal) {
    const naik = ideal - numBerat;
    rekomendasi = `Naikan sekitar ${naik} Kg`;
    queryAI = "5 Cara menaikan berat badan (jawab secara singkat saja)";
  } else {
    rekomendasi = `Berat Anda Sudah Sangat Ideal, Pertahankan!`;
  }

  document.getElementById("return_rekomendasi").textContent = rekomendasi;
  document.getElementById("calculateBMI").style.display = "table";

  // **Panggil AI Hanya Jika Berat Badan Kurang atau Berlebih**
  if (queryAI !== "") {
    const responseBox = document.getElementById("response");
    responseBox.textContent = "Loading...";

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            messages: [
              {
                role: "user",
                content: queryAI,
              },
            ],
            model: "llama-3.1-8b-instant",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      const aiResponse =
        data.choices[0]?.message?.content || "No response received.";
      typeWriter(aiResponse, responseBox);
    } catch (error) {
      console.error(error);
      responseBox.textContent = "An error occurred. Check console for details.";
    }
  }
}
