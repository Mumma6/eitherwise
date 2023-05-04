import { getOption, getOrElse, optionFold } from ".."
import { TOption } from "../interfaces"

///////////////////// Sample Code 1: Safe Data Access
interface User {
  id: number
  name: string
  address?: {
    street: string
    city: string
  }
}

const users: User[] = [
  { id: 1, name: "Alice", address: { street: "Main St", city: "New York" } },
  { id: 2, name: "Bob" },
]

const user = users.find((u) => u.name === "Bob")

// Without option utility library
const getUserCity = (user: User | undefined) => {
  let city
  if (user) {
    if (user.address) {
      city = user.address.city
    }
  }
  if (!city) {
    city = "No city"
  }

  return city
}

const city = getUserCity(user)
console.log(city) // Output: No city

// With option utility library
const getUserCityOption = (user: User | undefined): TOption<string> => getOption(user?.address?.city)
const cityOption = getUserCityOption(user)
const cityResult = getOrElse(cityOption, "No city")
console.log(cityResult) // Output: No city

//////////////////////////////// Sample Code 2: Transforming Optional Data
const formatPhoneNumber = (number: string): string => number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")

const getUserPhoneNumber = (user: { phoneNumber?: string }): TOption<string> => getOption(user.phoneNumber)

const userWithPhone = { phoneNumber: "1234567890" }
const userWithNoPhone = { phoneNumber: undefined }

// Without option utility library
const formattedPhone = userWithPhone.phoneNumber ? formatPhoneNumber(userWithPhone.phoneNumber) : "No phone number"
console.log(formattedPhone) // Output: (123) 456-7890

// With option utility library
const phoneNumberOption = getUserPhoneNumber(userWithPhone)
const phoneNumberOption2 = getUserPhoneNumber(userWithNoPhone)
const formattedPhoneResult = optionFold(phoneNumberOption, () => "No phone number", formatPhoneNumber)
const formattedPhoneResult2 = optionFold(phoneNumberOption2, () => "No phone number", formatPhoneNumber)
console.log(formattedPhoneResult) // Output: (123) 456-7890
console.log(formattedPhoneResult2) // Output: No phone number
