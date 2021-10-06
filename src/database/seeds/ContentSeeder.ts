import { Knex } from 'knex';
import * as config from '../../config/env';
import { ContentTable } from '../Enums/ContentEnums/ContentTable.Enum';

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex(config.default.content_table).del();

	const contents = [
		{
			id: 1,
			content: `Alexsandro de Souza, kısaca Alex (d. 14 Eylül 1977; Curitiba, Brezilya),orta saha mevkiinde oynayan Brezilyalı eski futbolcu, futbol yorumcusu ve teknik direktör.Brasileiro Série A ekiplerinden Coritiba'da ve Süper lig ekiplerinden Fenerbahçe'de 10 numaralı formayı giymiştir.Sao Paulo B takımını yönetmektedir.`,
			title: `Alexsandro de Souza`
		},

		{
			id: 2,
			content: `Süper Lig 2002-03 sezonunun 6. haftasında, Fenerbahçe ile Galatasaray arasında yapılan ve 6-0 Fenerbahçe'nin üstünlüğü ile sonuçlanan lig maçıdır.Maç, 6 Kasım 2002 tarihinde Mustafa Çulcu yönetiminde Fenerbahçe Şükrü Saracoğlu Stadyumu'nda oynanmıştır.Bu maçla birlikte Fenerbahçe, Süper Lig tarihinde Galatasaray'a karşı en farklı galibiyetini elde etmiştir.Kıtalararası derbi olarak da bilinen maçta Fenerbahçe'nin gollerini,Tuncay Şanlı, Ariel Ortega, Serhat Akın (2), Ceyhun Eriş ve Ümit Özat kaydetmiştir.Maçın 57. dakikasında Ariel Ortega, 84. dakikasında ise Emre Aşık kırmızı kart görmüştür.`,
			title: `Fenerbahçe 6-0 Galatasaray`
		},

        {
            id : 3,
            content:`sed risus ultricies tristique nulla aliquet enim tortor at auctor urna nunc id cursus metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper eget duis at tellus at urna condimentum 
            mattis pellentesque id nibh tortor id aliquet lectus proin nibh nisl condimentum id venenatis
            a condimentum vitae sapien pellentesque habitant morbi tristique senectus et netus et malesuada 
            fames ac turpis egestas sed tempus urna et pharetra pharetra massa massa ultricies mi quis hendrerit 
            dolor magna eget est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant morbi 
            tristique senectus et netus et malesuada fames ac turpis egestas integer eget aliquet nibh praesent tristique 
            magna sit amet purus gravida quis blandit turpis cursus`,
            title : `Lorem Ipsum Dolor Sith Amet`
        }
	];

    await knex(config.default.content_table).insert(contents);

	// Inserts seed entries
	
}
