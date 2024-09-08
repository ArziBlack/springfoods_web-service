## CLI Auth Documentation (SPRING FOODS): `create-user` and `login-user` Commands

This documentation provides details on how to use the `create-user` and `login-user` CLI commands built using **Commander.js**.

### Prerequisites
Before using the CLI, ensure the following:
1. You have **Node.js** and **npm** installed.
2. The project dependencies are installed by running:
   ```bash
   npm install
   ```
3. The MongoDB connection is properly configured in the `.env` file.

### Running the CLI

The CLI can be accessed using the following command:
```bash
npm run cli
```

## `create-user` Command

### Description:
The `create-user` command allows you to create a new user with the provided details. This user can be a regular user, admin, or vendor.

### Usage:
```bash
npm run cli -- create-user [options]
```

### Options:
| Option                 | Description                                                  | Required |
|------------------------|--------------------------------------------------------------|----------|
| `--password <string>`   | Password for the new user                                    | Yes      |
| `--role <string>`       | Role of the user (`user`, `admin`, `vendor`)                 | Yes      |
| `--gender <string>`     | Gender of the user (`male`, `female`, `non-binary`, etc.)    | Yes      |
| `--email <string>`      | Email address of the user                                    | Yes      |
| `--first-name <string>` | First name of the user                                       | Yes      |
| `--last-name <string>`  | Last name of the user                                        | Yes      |
| `--profile-image <string>` | URL or path to the profile image                          | Yes      |
| `--dob <string>`        | Date of birth of the user (YYYY-MM-DD)                       | Yes      |
| `--phone-number <number>`| Phone number of the user                                    | Yes      |
| `--is-email-verified`   | Specify whether the email is verified (Boolean)              | Yes      |
| `--last-login <string>` | Last login date of the user (YYYY-MM-DD)                     | Yes      |
| `--zip-code <number>`   | Zip code of the user's address                               | Yes      |
| `--street <string>`     | Street address of the user                                   | Yes      |
| `--city <string>`       | City of the user                                             | Yes      |
| `--state <string>`      | State of the user                                            | Yes      |
| `--country <string>`    | Country of the user                                          | Yes      |

### Example:
```bash
npm run cli -- create-user \
  --password "mypassword" \
  --role "user" \
  --gender "male" \
  --email "john.doe@example.com" \
  --first-name "John" \
  --last-name "Doe" \
  --profile-image "http://example.com/profile.jpg" \
  --dob "1990-01-01" \
  --phone-number 1234567890 \
  --is-email-verified true \
  --last-login "2024-09-01" \
  --zip-code 12345 \
  --street "123 Elm St" \
  --city "Metropolis" \
  --state "NY" \
  --country "USA"
```

### Output:
On successful user creation, the user details will be displayed in a table format.

## `login-user` Command

### Description:
The `login-user` command allows you to log in an existing user using their email and password.

### Usage:
```bash
npm run cli -- login-user [options]
```

### Options:
| Option               | Description                               | Required |
|----------------------|-------------------------------------------|----------|
| `--email <string>`    | Email address of the user                 | Yes      |
| `--password <string>` | Password for the user                     | Yes      |

### Example:
```bash
npm run cli -- login-user \
  --email "john.doe@example.com" \
  --password "mypassword"
```

### Output:
Upon successful login, the user details will be displayed in a table format, along with a token if the login is successful.

---

### Common Errors:
1. **Validation Error**: If any required fields are missing or incorrectly formatted, you will receive a validation error response.
2. **User Not Found**: If the email does not exist, an error message will be displayed.
3. **Invalid Password**: If the password does not match, the login will fail.

---

For further assistance, feel free to check the source code or reach out via the project repository [here](https://github.com/ArziBlack/springfoods_web-service).