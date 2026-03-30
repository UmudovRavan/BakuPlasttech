# 🌟 BakuPlastTech — Frontend (React) Arxitektura və Funksionallıq Sənədi (Backup)

Bu sənəd **BakuPlastTech** layihəsinin Frontend (React) tərəfinin qurulması üçün lazım olan bütün dizayn paradiqmalarını, səhifə tələblərini, API əlaqə detallarını və iş məntiqini (logic workflow) özündə birləşdirən *Master Backup* sənədidir. Backend-də qurduğumuz C# .NET API-ın tam gücündən istifadə etmək üçün React tərəfi bu sənəddəki prinsiplərlə yığılmalıdır.

---

## 🛠️ 1. İstifadə Olunacaq Texnologiyalar və Paketlər
Frontend tamamilə Single Page Application (SPA) arxitekturasında, dinamik və sürətli idarə ediləcək.
* **Core:** React 18+ (Vite ilə birgə).
* **Routing:** `react-router-dom` (İstifadəçi saytı və Admin üçün fərqli Layout yönləndirmələri).
* **Dövlət İdarəetməsi (State Management):** Sadə mərkəz üçün *React Context API* (Token və Dil dəyişənini saxlamaq üçün).
* **Data Fetching:** `axios` (İnterceptor ilə birlikdə, hər requestdə JWT göndərmək üçün).
* **Çoxdillilik:** `i18next` və `react-i18next` (AZ, RU, EN).
* **UI/UX Bildirişləri:** `react-hot-toast` (Error və Uğur mesajları üçün).
* **Form İdarəetməsi:** `react-hook-form` (FormData yığılması və validasiyalar).
* **İkonlar:** `lucide-react`.

---

## 🔄 2. API Əməliyyatları və Payload Modelləri (Funksiya və Formalar)

Aşağıdakı bölmə Frontend-in göndərməli olduğu `FormData` və `JSON` strukturlarını göstərir:

### 🔐 A. Auth (Giriş & Token)
* **Endpoint:** `POST /api/auth/login`
* **İcazə (Auth):** Yoxdur.
* **Content-Type:** `application/json`
* **Payload:** `{ "username": "admin", "password": "Admin123!" }`
* **Nəticə:** `TokenDto` (içində `accessToken` qaytarır).
* **Logic:** Qayıdan Token Context-ə və `localStorage/sessionStorage`-ə yazılmalı, `axios interceptor`-a qosşulmalıdır.

### 📁 B. Category (Kateqoriya İşləri)
1. **Siyahı:** `GET /api/categories` -> Admin və Mmüştəri (Public) uçün.
2. **Yaratmaq:** `POST /api/categories` -> Tələb edir: `Bearer Token`.
   * **Content-Type:** `multipart/form-data`
   * **Şərtilər:** `append('NameAz', value)`, `append('NameRu', value)`, `append('NameEn', value)`, `append('Slug', value)`, `append('ImageUpload', fileObject)`.
3. **Yeniləmək:** `PUT /api/categories/{id}` -> Tələb edir: `Bearer Token` və `FormData`.

### 📦 C. Product (Məhsul İşləri)
1. **Siyahı:** `GET /api/products` və ya `/api/products/featured`.
2. **Yaratmaq:** `POST /api/products` -> `Bearer Token`.
   * **Content-Type:** `multipart/form-data`
   * **Şərtilər:** Adlar (Az/Ru/En), Təsvirlər (Az/Ru/En), `CategoryId`, `Slug`, `Specifications` (JSON srting kimi və ya plain text), `IsActive`, `IsFeatured`.
   * **Çoxlu Şəkil:** Üzərindəki Input Multiple File olmalıdır. Seçilən bütün fayllar dövrəyə salınaraq FormData-ya eyni adla əlavə edilir: `formData.append('ImagesUpload', file1); formData.append('ImagesUpload', file2)`.
3. **Yeniləmək:** `PUT /api/products/{id}`
   * Şəkil silmə: Köhnə şəkillərdən hər hansı biri silinibse, həmin şəklin ID-sini `RemovedImageIds` (Array) olaraq backende göndərməli (məs: `append("RemovedImageIds[0]", 5)`).

### ✉️ D. Inquiry (Müraciətlər)
1. **Public Göndərmə:** `POST /api/inquiries` (No Token)
   * **Content-Type:** `application/json`
   * **Nə Göndərir:** `{ fullName, email, phone, message, productId (optional) }`. Müştəri spesifik bir məhsulun içindən yazırsa, həmən məhsulun İD-si gedəcək.
2. **Admində Oxumaq:** `GET /api/inquiries`
3. **Oxundu İşarələmək:** `PUT /api/inquiries/{id}/read` (Admin Token).

---

## 🏗️ 3. Səhifə (Page) və Layout Axını

Sistem daxilində 2 böyük Layout olacaq: **PublicLayout** və **AdminLayout**.

### 🌐 3.1. PublicLayout (İstifadəçi Saytı)
Arxa fon, başlıq, footer (aşağı qisim), menyular və çoxdilli seçimlər bu Layout-da cəmləşəcək.

* **Ana Səhifə (`/`):**
  * **Hero Section:** Çox cəlbedici böyük şəkil, qısa text (slogan) və "Məhsullarımız" düyməsi.
  * **Featured Products:** Yalnız `IsFeatured === true` olan populyar məhsulların karusel və ya qrid şəklində nümayişi. (İstək: `/api/products/featured`).
  * **About Snippet:** Haqqımızda səhifəsinin qısa anonsu və dəyərlərimiz (Niyə BakuPlastTech?).

* **Məhsullar Səhifəsi (`/products`):**
  * Sol (və ya üst) tərəfdə Kateqoriya qridləri (`/api/categories`).
  * Kateqoriyaya görə filterasiya funksionallığı. Ekrana kateqoriya və məhsulları düzürük.

* **Məhsulun Təfərrüatı (`/products/:slug`):**
  * Məhsulun sol tərəfində **Böyük şəkil və altında Xırda qalereya düymələri** (Hover zamanı şəkil dəyişir). `product.Images` arrayındən dövrə salınır.
  * Sağ tərəfdə `Name`, `Description`, `Specifications` (Xüsusiyyətlər).
  * Altında düymə: **"Bu məhsulla bağlı sorğu göndər"** -> Klikləyəndə Modal açılır və ya ekranda Forma düşür (form içərisində ProductId gizli şəkildə saxlanılır).

* **Haqqımızda (`/about`) & Əlaqə (`/contact`):**
  * Şirkət şərhləri, Google Map, sadə təmiz İnquiry Form (Əlaqə formu).

---

### 🔒 3.2. AdminLayout (Qapalı / İdarəetmə Paneli)
Yalnız `Token`-i olan istifadəçilər girə bilir. Əks halda `/admin/login` səhifəsinə atılır. Sol tərəfdə sabit Dashboard Sidebar yerləşir.

* **Dashboard (`/admin/dashboard`):**
  * Kartlar şəklində statistikalar: "Ümumi Məhsullar", "Yeni (Oxunmamış) Müraciətlər". Məlumatları çəkmək üçün `GET` resurslarından (array length) istifadə edilir.
  
* **Kateqoriyalar (`/admin/categories`):**
  * Cədvəl (Table) sistemi: İD, Şəkil (miniatur), Adı (Az/Ru/En) və Fəaliyyətlər (Edit / Delete).
  * Modal daxilində Forma: Mətn inputları və Fayl inputu qoyulur.
  
* **Məhsullar (`/admin/products`):**
  * Yenə eyni Cədvəl və daha kompleks Forma obyekti. Formaya Drag & Drop (sürüşdürüb buraxan) şəkil qutusu əlavə etmək çox professional göstərəcək (Multiple).
  
* **Müraciətlər (`/admin/inquiries`):**
  * Gələn müraciətlərin listi. Seçilərək tamamını oxuyan Popup (Modal) açılır. Həmin an arxa planda API-a (`id/read`) istək gedir ki, status True-ya (Oxundu) dönsün. Silmə funksiyası mövcuddur.

---

## 🌍 4. Dinamik Çoxdillilik (i18n) Məntiqi

Frontend-də bir çox söz (məsələn, "Haqqımızda", "Göndər") statik json tərcümələrindən gələcək.
Lakin **Verilənlər Bazasından (Database)** gələn mallarım (Məhsul, Kateqoriya) 3 dildədir.

**Front-End Məntiqi belə olmalıdır:**
```javascript
import { useTranslation } from 'react-i18next';

const ProductCard = ({ product }) => {
  const { i18n } = useTranslation();
  
  // Mövcud dil 'az', 'ru' və ya 'en' olaraq gələcək.
  // İlk hərfini böyütmək üçün formatlayırıq: 'Az', 'Ru', 'En'
  const currentLang = i18n.language.charAt(0).toUpperCase() + i18n.language.slice(1);
  
  // Obyektdən dinamik çağırmaq: product["NameAz"]
  const productName = product[`Name${currentLang}`];
  const productDesc = product[`Description${currentLang}`];

  return (
    <div>
       <h3>{productName}</h3>
       <p>{productDesc}</p>
    </div>
  )
}
```
*Bu sadə və çox güclü metodla heç bir uzantılı if/else yazmadan eyni kartı hər 3 dil üçün real-time quraşdırmış oluruq.*

---

## 🎨 5. Dizayn və Vizual Paradiqmalar
BakuPlastTech "Sənaye" və "Plastik İnşaat Materialları" şirkətidir. Lakin, dizayn köhnə stildə olmamalıdır!

1. **Rəng Paleti (Color Palette):**
   * **Primary:** Göy və ya Tünd Mavi (Professionalizm və güvən).
   * **Secondary / Accent:** Turuncu (Diqqət çəkici, material/plastik sənayesini təmsil edən kontrast).
   * **Background:** Təmiz ağ (Cardlar) və Açıq boz fonda kölgələr (Glassmorphism effektləri ola bilər).
2. **Typografya:** Modern sadə şriftlər (məsələn: *Inter*, *Roboto*, və ya *Outfit*).
3. **Mikro-Animasiyalar:**
   * Hover effektləri (Məhsul kartına gələndə cüzi yuxarı qalxma və kölgə salma).
   * Menyu transitionları (sürətlə qaçmayan, "smooth" açılan).
4. **Responsive:** Ekrana tam uyğunlaşma. Mobil naviqasiya mütləq olmalıdır (Bürger menu).

*(Bu backup sənədi, Frontend inkişafında proqramçının atacağı hər bir addımı işıqlandırmaq, React komponentlərinin düzgün modellənməsini və API-in strukturunu ona sərbəst şəkildə köçürməsini təmin edir).*
