document.addEventListener('DOMContentLoaded', function(){
    const viewPoinSigma = document.getElementById('viewSigma')
    const poinBars = document.querySelectorAll('.poinBar');
    const formUser = document.querySelector('form')
    const jenisKepribadian = document.getElementById('persona')
    let gambarPersona = document.querySelector('section>img')
    const originalValuesPoin = [];
    let kepriBadianAsli;
    let nama;
    let intervalId;

    formUser.addEventListener('submit', e => {
      e.preventDefault()
      const formData = new FormData(formUser);
      nama = formData.get('nama').toLowerCase()
      document.querySelector('#viewSigma>section>h1').innerHTML = nama
      let userData = JSON.parse(localStorage.getItem('userData')) || {};
      if (nama === '' || nama.length <= 2) {
        e.preventDefault()
        alert('nama harus di isi dan lebih 2 huruf')
      } else {
      viewPoinSigma.style.setProperty('display', 'block')
      setTimeout(() => {
        document.querySelector('main').style.setProperty('transform', 'rotateY(-180deg)')
      }, 300);
        setTimeout(() => {
          formUser.style.setProperty('display', 'none')
          if (userData[nama]) {
            console.log(userData[nama])
            userData[nama].forEach(poinUser => {
              originalValuesPoin.push(poinUser)
            });
            poinBars.forEach(function(poinBar, index) {
              let value = originalValuesPoin[index]
              poinBar.style.width = value + '%';
              setTimeout(() => {
                poinBar.innerHTML = value + '%';
              }, 520);
            });
          } else {
            poinBars.forEach(function(poinBar, index) {
              let randomValue = randomPoin(index);
              originalValuesPoin[index] = randomValue;
              console.log(originalValuesPoin[index])
              poinBar.style.width = randomValue + '%';
              setTimeout(() => {
                poinBar.innerHTML = randomValue + '%';
              }, 520);
            });
            console.log(userData);
            userData[nama] = originalValuesPoin;
            localStorage.setItem('userData', JSON.stringify(userData));
          }
          jenisKepribadian.textContent = randomPersona()
        }, 400);

        if(!intervalId) {
          intervalId = setInterval(function() {
            console.log('woi');
            if (jenisKepribadian.innerText != kepriBadianAsli) {
            jenisKepribadian.innerText = kepriBadianAsli 
            }
            poinBars.forEach(function(poinBar, index) {
              const originalValue = originalValuesPoin[index];
              if (parseInt(poinBar.style.width) !== originalValue) {
                poinBar.style.width = originalValue + '%';
                poinBar.textContent = originalValue + '%';
              }
            });
          }, 1000);
        }
      }
    })



    document.querySelector('button[type="button"]').addEventListener('click', function () {
      clearInterval(intervalId)
      formUser.style.setProperty('display', 'flex')
      setTimeout(() => {
        document.querySelector('main').style.setProperty('transform', 'rotateY(0deg)')
        setTimeout(() => {
          originalValuesPoin.length = 0;
          poinBars.forEach(poinBar => {
            poinBar.style.width = 0 + '%' 
            poinBar.innerHTML = ''
          });
          viewPoinSigma.style.setProperty('display', 'none')
        }, 100);
      }, 300);
    })

    function randomPoin(targetIndex){
        if (targetIndex !== 4) {
          let randomValue
          let kemungkinan = Math.random();
          let poinAcak = Math.random();
          
          if (kemungkinan < 0.65) {
          randomValue = 30 + Math.pow(poinAcak, 2) * 65;
          } else {
          randomValue = 17 + Math.sqrt(poinAcak) * 47;
          }
          randomValue = Math.floor(randomValue)

          if (randomValue > 80) {
          randomValue = Math.floor(Math.pow(poinAcak, 2) * 20) + 70;
          }
          return randomValue;
        } else {
          let result = Math.round(originalValuesPoin.reduce((angkaDitarget, angkaTempatHasil) => angkaDitarget + angkaTempatHasil, 0) / 4)
          return result
        }
    }
    
    function randomPersona() {
      let karakter = []
      if ( originalValuesPoin[0] <= 20) {
        karakter.push('cringe kuadrat dikali jamet👺')
      } else if (originalValuesPoin[0] >= 20 && originalValuesPoin[0] <= 30) {
        karakter.push('bocah pickme sok imut🥵')
      } else if (originalValuesPoin[0] >= 30 && originalValuesPoin[0] <= 50) {
        karakter.push('npc nolep')
      } else if (originalValuesPoin[0] >= 50 && originalValuesPoin[0] <= 60) {
        karakter.push('wibu bau bawang')
      } else if (originalValuesPoin[0] >= 60 && originalValuesPoin[0] <= 70) {
        karakter.push('bocah dark system🤬')
      } else if (originalValuesPoin[0] >= 70 && originalValuesPoin[0] <= 80) {
        karakter.push('rajin dan suka membantu orang🤗')
      } else if (originalValuesPoin[0] >= 80 && originalValuesPoin[0] <= 90) {
        karakter.push('manipulatif dan bikin ketar ketir🥶')
      }else {
        karakter.push('sangat dihormatin dan rispek🤫')
      }
      
      if ( originalValuesPoin[4] <= 20) {
        karakter.push('bocah akward🤓')
        gambarPersona.src = "gambar/p0020.jpg"
      } else if (originalValuesPoin[4] >= 20 && originalValuesPoin[4] <= 30) {
        karakter.push('rada freak')
        gambarPersona.src = "gambar/p2030.jpg"
      } else if (originalValuesPoin[4] >= 30 && originalValuesPoin[4] <= 50) {
        karakter.push('normal')
        gambarPersona.src = "gambar/p3050.jpg"
      } else if (originalValuesPoin[4] >= 50 && originalValuesPoin[4] <= 60) {
        karakter.push('rapih dan wangi tapi umur 2 bulan thoriq udah haji😌')
        gambarPersona.src = "gambar/p5060.jpeg"
      } else if (originalValuesPoin[4] >= 60 && originalValuesPoin[4] <= 70) {
        karakter.push('remaja generasi emas 2040😇')
        gambarPersona.src = "gambar/p6070.jpg"
      } else if (originalValuesPoin[4] >= 70 && originalValuesPoin[4] <= 80) {
        karakter.push('karismatik😎')
        gambarPersona.src = "gambar/p7080.jpg"
      } else if (originalValuesPoin[4] >= 80 && originalValuesPoin[4] <= 90) {
        karakter.push('bocil miliarder kripto🤑')
        gambarPersona.src = "gambar/p8090.jpeg"
      }else {
        karakter.push('the next presiden 2028😈')
        gambarPersona.src = "gambar/p90100.jpg"
      }
      kepriBadianAsli = karakter.join(',')
      return karakter
    }
})