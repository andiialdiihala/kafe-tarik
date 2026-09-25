export interface MenuItem {
  id: string;
  name: string;
  category: "Kopi" | "Non-Kopi" | "Makanan" | "Camilan";
  price: number;
  description: string;
  image: string;
  isPopular?: boolean;
}

export const menuCategories = ["Semua", "Kopi", "Non-Kopi", "Makanan", "Camilan"] as const;

const images = {
  Kopi: [
    "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500&q=80",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80",
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80",
    "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=500&q=80",
    "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80",
  ],
  "Non-Kopi": [
    "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80",
    "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&q=80",
    "https://images.unsplash.com/photo-1564890369478-c89ca64c94ea?w=500&q=80",
    "https://images.unsplash.com/photo-1544787219-7f47cc556763?w=500&q=80",
    "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?w=500&q=80",
  ],
  Makanan: [
    "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&q=80",
    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=80",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=80",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80",
    "https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?w=500&q=80",
  ],
  Camilan: [
    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&q=80",
    "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&q=80",
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80",
    "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=500&q=80",
    "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=500&q=80",
  ],
};

const names: Record<MenuItem["category"], string[]> = {
  Kopi: ["Kopi Tarik Klasik","Es Kopi Susu Tarik","Kopi Tubruk Gula Aren","Cappuccino Tarik","Americano Dingin","Kopi Latte Vanilla","Kopi Hitam Aceh Gayo","Es Kopi Caramel","Kopi Mocha","Vietnam Drip","Kopi Jahe Hangat","Cold Brew Tarik","Kopi Buttercream","Es Kopi Pandan","Kopi Susu Klepon"],
  "Non-Kopi": ["Teh Tarik Original","Teh Cokelat Tarik","Matcha Latte","Thai Tea Creamy","Red Velvet Latte","Taro Milk Tea","Lemon Tea Segar","Chocolate Ice Blend","Strawberry Milk","Milo Dinosaurus","Teh Melati Madu","Lychee Yakult","Manggo Smoothies","Vanilla Milkshake","Bandung Soda Gembira"],
  Makanan: ["Nasi Goreng Tarik","Mie Goreng Aceh","Nasi Lemak Ayam","Ayam Geprek Sambal","Soto Ayam Koya","Nasi Ayam Penyet","Mie Kuah Nyemek","Nasi Kari Ayam","Bakmi Goreng Jawa","Nasi Gulai Ikan","Ayam Bakar Madu","Nasi Soto Betawi","Mie Aceh Kuah","Nasi Bebek Goreng","Lontong Sayur Medan"],
  Camilan: ["Pisang Goreng Gurih","Roti Bakar Cokelat","Kentang Goreng Keju","Cireng Bumbu Rujak","Tahu Crispy","Tempe Mendoan","Singkong Keju","Donat Kampung","Risoles Mayo","Lumpia Semarang","Pisang Bakar Karamel","Onion Ring Crispy","Churros Cokelat","Roti John Mini","Martabak Mini Manis"],
};

const descs: Record<MenuItem["category"], string[]> = {
  Kopi: ["Kopi hitam pekat ditarik tinggi hasilkan busa lembut.","Creamy kopi susu + gula aren legit.","Tubruk tradisional harum gula aren asli.","Espresso + susu lembut tarikan khas.","Americano dingin segar tanpa gula.","Latte vanilla halus wangi.","Single origin Aceh Gayo pahit nikmat.","Caramel manis berpadu espresso.","Cokelat + kopi pekat creamy.","Drip Vietnam kental manis.","Kopi jahe hangat rempah.","Cold brew 12 jam smooth.","Buttercream gurih di atas kopi.","Pandan wangi + kopi susu.","Klepon pandan lumer di kopi susu."],
  "Non-Kopi": ["Teh pekat ditarik creamy.","Teh + cokelat gurih manis.","Matcha Jepang premium creamy.","Thai tea pekat susu kental.","Red velvet lembut manis.","Taro ungu legit creamy.","Lemon tea asam segar.","Es cokelat blend dingin.","Susu stroberi segar.","Milo tumpah topping melimpah.","Teh melati + madu alami.","Lychee + yakult segar.","Mangga harum smoothies.","Milkshake vanilla lembut.","Soda + sirup bandung segar."],
  Makanan: ["Nasi goreng wajan smoky ayam + telur.","Mie goreng Aceh bumbu rempah.","Nasi lemak gurih ayam goreng.","Ayam geprek pedas sambal bawang.","Soto kuning koya gurih.","Ayam penyet sambal terasi.","Mie nyemek kuah pedas.","Kari ayam kental santan.","Bakmi Jawa wok smoky.","Gulai ikan asam pedas.","Ayam bakar oles madu manis.","Soto Betawi santan gurih.","Mie Aceh kuah kari pekat.","Bebek goreng sambal ijo.","Lontong sayur santan Medan."],
  Camilan: ["Pisang raja tepung renyah keemasan.","Roti panggang cokelat lumer.","Kentang goreng tabur keju.","Cireng kenyal bumbu rujak.","Tahu goreng crispy garam.","Tempe mendoan tipis renyah.","Singkong goreng keju gurih.","Donat gula halus empuk.","Risoles isi mayo + sosis.","Lumpia isi ayam sayur.","Pisang bakar saus karamel.","Onion ring tepung crispy.","Churros tabur gula kayu manis.","Roti John telur mayo.","Martabak mini topping cokelat kacang."],
};

export const menuList: MenuItem[] = Array.from({ length: 60 }, (_, i) => {
  const category = (["Kopi", "Non-Kopi", "Makanan", "Camilan"] as const)[i % 4];
  const idx = Math.floor(i / 4);
  return {
    id: (i + 1).toString(),
    name: names[category][idx],
    category,
    price: 12000 + (idx % 5) * 3000 + (i % 3) * 1000,
    description: descs[category][idx],
    image: images[category][idx % images[category].length],
    isPopular: idx < 2,
  };
});
