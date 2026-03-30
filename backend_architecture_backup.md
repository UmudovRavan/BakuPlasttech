# 📚 BakuPlastTech — Backend Arxitektura və Backup Sənədi

Bu sənəd **BakuPlastTech** layihəsinin arxa fonunda işləyən C# ASP.NET Core (.NET 8) backend sisteminin detallı ümumi strukturunu və vacib məqamlarını ehtiva edir. Hər hansı bir sistem yenilənməsində və ya testdə bu xülasədən bir "Bələdçi (Backup)" olaraq istifadə edə bilərsiniz.

---

## 🏗️ 1. Onion Architecture (Qatlı Arxitektura) Strukturu

Layihə sərt şəkildə SOLID və Dependency Inversion (DI) prinsiplərinə uyğun **Onion Architecture** ilə 5 qata bölünüb:

1. **Domain (`BakuPlastTech.Domain`)**
   - **Tərkibi:** Baza Entity-ləri (`Category`, `Product`, `ProductImage`, `Inquiry`, `AppUser`).
   - **İnterfeyslər:** `IRepository<T>` kimi baza və spesifik İnterfeyslər (`ICategoryRepository` və s.).
   - **Müstəqillik:** Heç bir EF Core və ya xarici paket asılılığı yoxdur. Nüvə buradır. 

2. **Contract (`BakuPlastTech.Contract`)**
   - **Tərkibi:** `DTOs` (Data Transfer Objects). Məlumat transferini və map-ləməni təmin edir (`CreateDto`, `UpdateDto`).
   - **İnterfeyslər:** `Services` (`IProductService`, `IAuthService` və s.). Application-Api arasında qapı rolunu oynayır.
   - **Özəllik:** `IFormFile` (fayl yükləmə) istifadəsi üçün daxili `Microsoft.AspNetCore.App` asılılığına sahibdir.

3. **Application (`BakuPlastTech.Application`)**
   - **Tərkibi:** Contract-da yaranan Service İnterfeyslərinin işləyən vəziyyəti (`CategoryService.cs`).
   - **Məntiq:** `AutoMapper` üzərindən əşyaları konvert edir və Repository-dən DTO qaytarır.
   - **Asılılıqlar:** Domain və Contract qatları ilə birbaşa əlaqəlidir. 

4. **Persistence (`BakuPlastTech.Persistence`)**
   - **Tərkibi:** Verilənlər bazası (Entity Framework Core) və onun idarəçiliyi (`AppDbContext.cs`).
   - **Konfiqurasiyalar:** Hər Entity-in necə qurulacağı `Configurations` içərisində yerləşdirildi (Məsələn, Relation-lar, Foreign Keys, və Cascade hesabatları).
   - **Seeder:** İlk başlanğıcda admin istifadəçisinin (`DbSeeder.cs`) yaranmasını tənzimləyir.
   - **Repository:** Domain qatındakı Repo interfeyslərinin birbaşa EF Core daxilində implementasiyası.

5. **Infrastructure (`BakuPlastTech.Infrastructure`)**
   - **Tərkibi:** Token yaradılması, şifrələnməsi (`AuthService.cs`) və Şəkillərin fiziki yüklənməsi / silinməsi (`FileService.cs`).
   - **Asılılıq:** JWT paketlərini barındırır və birbaşa sistem resursları (Fayl sistemi, Auth) ilə işləyir.

6. **API (`BakuPlastTech.API`)**
   - **Tərkibi:** Controller-lər (`AuthController.cs`, `CategoriesController.cs` və s.).
   - **Konfiqurasiyalar:** `Program.cs`-də hər bir qatın `AddServices` metodları sıraya düzüldü, JWT yoxlanması, Swagger qurulumu və CORS tətbiq edildi.

---

## 📦 2. Quraşdırılmış (Yüklənmiş) Əsas Paketlər

* **Microsoft.EntityFrameworkCore.SqlServer** (v8.0.0) — *Persistence Qatı*
* **Microsoft.AspNetCore.Identity.EntityFrameworkCore** (v8.0.0) — *Persistence Qatı*
* **Microsoft.EntityFrameworkCore.Design / Tools** (v8.0.0) — *API Qatı* (Miqrasiya üçün)
* **AutoMapper** və **AutoMapper.Extensions.Microsoft.DependencyInjection** (v13.0+) — *Application Qatı*
* **Microsoft.AspNetCore.Authentication.JwtBearer** (v8.0.0) — *Infrastructure və API Qatı*

---

## 🔒 3. Təhlükəsizlik və Mühit (Environment) Məlumatları

**`appsettings.json`:**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=BakuPlasttech;Trusted_Connection=True;MultipleActiveResultSets=true"
  },
  "Jwt": {
    "Key": "BakuPlastTechSuperSecretKey_For_JWT_Authentication_XYZ12345!",
    "Issuer": "http://localhost:5000",
    "Audience": "http://localhost:5000"
  }
}
```

**Admin Məlumatları (Avtomatik Seed):**
* **Username:** `admin`
* **Email:** `admin@bakuplasttech.az`
* **Password:** `Admin123!`
* **Rol:** `Admin`

---

## 📡 4. Həll Olunmuş və Əlavə Edilmiş Mühüm Məntiq

* **Şəkilləri İdarə Etmək (FileService):** Məhsul (Product) daxilində eyni anda fərqli sayda şəkilləri `IFormFileCollection` istifadəsi ilə serverin `wwwroot/uploads/products` qovluğuna toplayırıq. Əməliyyat uğursuz olduqda və ya silinmədən əvvəl fiziki şəkil faylları serverdən uçaraq yer openspace edir.
* **Təhlükəsiz ID Yoxlanışı (CATCH):** Error Handling bütün Servislərdə (Application daxilində) `try-catch` blokları halında daxil edilib və Microsoft un `ILogger` interfeysi ilə idarə edilir (Log terminala vurulur).
* **Identity Overriding Xətası:** `Program.cs`-də Dependency İnjection-lar daxil edilmişdi ki, `AddIdentity()` həmişə JWT (`AddInfrastructureServices`) sırasından əvvəl olsun ki, avtorizasiya problemi yaranmasın.
* **Swagger Auth:** API bələdçisinə daxil olanda, sağ küncdə Lock 🔒 ilə `Bearer jwt_tokeni` ataraq bütün privat (admin) endpoint-ləri manual olaraq quraşdırmadan test etmək bacarığı quruldu.

---

## 🚀 5. API Endpoint Xəritəsi

| Endpoint | HTTP Method | İcazə Lazımdır? | Parametr / Body Tipi | Təsvir |
|---|---|---|---|---|
| **`/api/auth/login`** | `POST` | ❌ Xeyr | JSON (`LoginDto`) | Məlumat göndərib AccessToken almaq. |
| **`/api/categories`** | `GET` | ❌ Xeyr | Boş | Bütün kateqoriyalar siyahısı. |
| **`/api/categories`** | `POST` | ✅ Admin | form-data (şəkil + text) | Kateqoriya yaratmaq. |
| **`/api/products`** | `GET` | ❌ Xeyr | Boş | Bütün məhsullar. |
| **`/api/products`** | `POST` | ✅ Admin | form-data (şəkil + text) | Yeni Məhsul yaratmaq. |
| **`/api/inquiries`** | `POST` | ❌ Xeyr | JSON | Müştərinin təklif/istək atması. |
| **`/api/inquiries`** | `GET` | ✅ Admin | Boş | Şirkətə gələn müraciətləri oxumaq. |

*Hər bir endpoint ən müasir C# standartları ilə `async - Task` ilə işləyir.*

*(Bu fayl istənilən zaman texniki istinad üçün istifadə edilə bilər).*
