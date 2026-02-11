# Today's Updates (Dec 8, 2025){}
- **TermsOfServiceContent.tsx** – Added Governing Law, User Accounts, and Termination sections; redesigned hero section with full-width background.

- **CookiePolicyContent.tsx** – Added professional hero background; fixed mobile modal centering.

- **PrivacyPolicyContent.tsx** – Added hero background; improved IntersectionObserver; added scrollable sidebar.

- **Mobile Modals (all policy pages)** – Centered contact modal on mobile.

- **Sidebar Navigation** – Fixed active highlight; improved scrollable layout.

- **Hero Sections (all policy pages)** – Added Cognizant-style full-width backgrounds; reduced padding for compact layout.

- **Footer.tsx** – Fixed white email input box.

- **ScrollToTop.tsx** – Added circular progress indicator; footer detection; hides when drawer is open.

- **page.tsx** – Added footer detection for Contact Us button.

- **CookieConsent.tsx** – Updated animation to slower 0.8s ease-out.



# Today's Updates (Dec 11, 2025)
# 📧 EmailJS – Quick Setup Guide (Simple Version)

### 🔐 Login

* **Website:** [https://www.emailjs.com/](https://www.emailjs.com/)
* **Email:** [creatzionworkspace@gmail.com](mailto:creatzionworkspace@gmail.com)
* **Password:** 3u!v2dz.PivPBfK

---

## ⭐ What EmailJS Does

When someone submits your Contact Us form, EmailJS sends **two emails automatically**:

1. **To Your Company** → You get the user's details
2. **To the User** → They get a “Thank you, we will contact you soon” message

No backend needed.

---

## 📧 Templates in Your EmailJS Account

Your EmailJS already has **2 templates**:

### 1. **Contact Us**

* Sends form details (name, email, phone, message)
* Recipient: **[creatzionworkspace@gmail.com](mailto:creatzionworkspace@gmail.com)**

### 2. **Auto-Reply**

* Sends thank you message to the user
* Recipient: User’s email
* This is a **no-reply** message

---

## 🎨 How to Edit Templates

1. Login → Go to **Email Templates**
2. Click the template
3. Choose:

   * **Design Editor** → Easy drag & drop
   * **Code Editor** → For HTML/CSS
4. Edit → **Apply Changes** → **Save**

---

## 🔑 API Keys

Your EmailJS **Service ID, Template ID, and Public Key** are inside your **.env** file in the project.

⚠️ Never share your `.env` file.

---

## 📊 Check Email Status

In EmailJS dashboard:

* Go to **Email History**
* You can see:

  * Sent emails
  * Failed emails
  * Time & recipient

Email limit: **200 emails/month** on free plan.

---

## 💻 Project Files Updated

* `components/ContactUsContent.tsx`
* `app/contact/page.tsx`
* `.env` file

Install required package once:

```
npm install
```

---

## ✅ How to Test

1. Fill your contact form
2. Check:

   * **Company email** → should receive user details
   * **User email** → should receive auto-reply
3. Check EmailJS → **Email History** for success status

Flow:
**User submits form → EmailJS sends 2 emails automatically**

---

## 🎯 Important Points

* Company email receiving messages: **[creatzionworkspace@gmail.com](mailto:creatzionworkspace@gmail.com)**
* Auto-reply is no-reply
* Always save template changes
* Check monthly email quota

