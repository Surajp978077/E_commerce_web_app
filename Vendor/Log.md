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
