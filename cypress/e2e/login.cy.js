describe("Login Sayfası", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173"); // vite dev server portun neyse
  });

  it("başarılı form ile submit edip success sayfasına gidebiliyorum", () => {
    cy.get("#email").type("test@example.com");
    cy.get("#password").type("Test1234!");
    cy.get("#terms").check();
    cy.get("button[type='submit']").should("not.be.disabled").click();
    cy.url().should("include", "/success");
  });

  it("email yanlış girilirse 1 hata mesajı gösterilir ve buton disabled kalır", () => {
    cy.get("#email").type("hatalimail").blur();
    cy.get("#password").type("Test1234!");
    cy.get("#terms").check();

    cy.get("p[data-cy='email-error']").should("have.length", 1);
    cy.get("p[data-cy='email-error']").should(
      "contain.text",
      "Geçerli bir email adresi giriniz."
    );
    cy.get("button[type='submit']").should("be.disabled");
  });

  it("email ve password yanlışsa 2 hata mesajı gösterilir", () => {
    cy.get("#email").type("hatalimail").blur();
    cy.get("#password").type("123").blur();
    cy.get("#terms").check();

    cy.get("p[data-cy='email-error']").should("exist");
    cy.get("p[data-cy='password-error']").should("exist");
    cy.get("[data-cy$='-error']").should("have.length", 2);
    cy.get("button[type='submit']").should("be.disabled");
  });

  it("email ve password doğru ama şartlar kabul edilmezse buton disabled kalır", () => {
    cy.get("#email").type("test@example.com");
    cy.get("#password").type("Test1234!");
    // terms checkbox işaretlenmiyor
    cy.get("button[type='submit']").should("be.disabled");
  });
});