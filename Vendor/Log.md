# Launch

- If not Vendor then show error page
- check the validity of the token
  - if the token is invalid (expired, tampered), redirect back to login page
- If the token is valid, then show the vendor dashboard

- Dashboard page

  - Vendor profile button
    - Name
    - Email
    - Phone
    - Address
    - City
    - State
    - Country
    - Zipcode

- If a new vendor, then create a new vendor in the database
- Check for any empty fields in the vendor profile, ask to fill them accordingly

- Listings page

  - Button for adding a new listing
    - Stepper to show the steps for adding a new listing
    - Search the category under which the product is to be added and click next
    - Enter the product details
  - Show all the listings of the vendor
    - Pagination for the listings
    - Switch for the status of the listing (active/inactive)
    - Button for editing the listing
      - Edit the product name
      - Edit the product description
      - Edit the product price by that vendor
      - Edit the product quantity by that vendor
      - Submit button for editing the listing
    - Store the page number in the session
  - Search bar to add a new listing from the existing products
    - Search by product name
    - Display the listings grouped by the category of the product
    - Click on the product to add the listing to the vendor
      - Open the prouct page
      - Show the product details
      - Enter the product price, visibility, quantity
      - Submit button for adding the listing
