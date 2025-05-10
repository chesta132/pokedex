function capitalizeEachWord(inputString) {
  // Pastikan input adalah string dan bukan null/undefined
  if (typeof inputString !== 'string' || inputString === null) {
    return inputString; // Kembalikan input aslinya jika bukan string
  }

  // 1. Ubah seluruh string menjadi lowercase terlebih dahulu (opsional tapi disarankan
  //    untuk konsistensi, terutama jika input mungkin memiliki campuran case)
  const lowerCaseString = inputString.toLowerCase().replaceAll('-', ' ');

  // 2. Bagi string menjadi array kata-kata menggunakan spasi sebagai pemisah
  const words = lowerCaseString.split(' ');

  // 3. Gunakan map untuk memproses setiap kata dalam array
  const capitalizedWords = words.map(word => {
    // Jika kata kosong (misalnya karena ada multiple spasi), kembalikan string kosong
    if (word.length === 0) {
      return '';
    }
    // Ambil huruf pertama, ubah menjadi uppercase
    const firstLetter = word.charAt(0).toUpperCase();
    // Ambil sisa kata (dari index 1 sampai akhir)
    const restOfWord = word.slice(1);
    // Gabungkan huruf pertama yang sudah di-uppercase dengan sisa kata
    return firstLetter + restOfWord;
  });

  // 4. Gabungkan kembali array kata-kata yang sudah diproses menjadi satu string
  const resultString = capitalizedWords.join(' ');

  return resultString;
}

export default capitalizeEachWord;