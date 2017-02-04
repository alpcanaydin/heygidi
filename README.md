# Heygidi

Heygidi, Hurriyet API kullanılarak 1997'den 2017'ye kadar Gündem kategorisindeki haberlerin başlıklarında en çok kullanılan kelimeleri görselleştiren bir istatistik çalışmasıdır.

Kelimelerin köklerini bulabilmek için [zemberek-nlp](https://github.com/ahmetaa/zemberek-nlp), kelimeleri saymak için **Elasticsearch**, görselleştirme için ise **d3.js** kullanılmıştır.

## Kurulum
Komutları çalıştırmadan önce `backend/config.json.example` dosyasını kendi bilgilerinizle güncelleyip `backend/config.json` şeklinde kaydetmeniz gerekmektedir.

* **Hurriyet API**'den verileri çekmek için `backend/bin/fetchData.js` dosyası çalıştırılmalıdır.
* **Elasticsearch** üzerinde mapping'leri yaratmak için `backend/bin/createMapping.js` dosyası çalıştırılmalıdır.
* **Çekilen veriyi Elasticsearch'e aktarmak** için `backend/bin/indexData.js` komutu çalıştırılmalıdır.
* **Kelimeleri saymak** için ise `backend/bin/exportData.js` komutu kullanılmalıdır.

React uygulaması `app` dizininde bulunmaktadır.
