import "./style.css"
import bot from "../assets/bot.svg"
import user from "../assets/user.svg"

const form = document.querySelector("form")
const chatContainer = document.querySelector("#chat_container")


let loadInterval: any

function loader(element: any) {
  element.textContent = ""
  loadInterval = setInterval(() => {
    element.textContent += "."
    if (element.textContent === "....") {
      element.textContent = ""
    }
  }, 300)
}

function typeText(element: HTMLElement, text: any) {
  let index = 0

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index)
      index++
    } else {
      clearInterval(interval)
    }
  }, 20)
}

function generateUniqueId() {
  const timestamp = Date.now()
  const randomNumber = Math.random()
  const hexString = randomNumber.toString(16)
  return `id-${timestamp}-${hexString}`
}

function chatStripe(isAi: boolean, value: any, uniqueId: string) {
  return `
    <div class="w-full p-2 rounded-md ${isAi && "bg-gray-900"}">
      <div class="flex flex-row">
        <div class="shrink-0 mr-4 p-3 rounded-md ${isAi ? "bg-red-500" : "bg-primary-500"} ">
          <img class="h-4 w-4" src="${isAi ? bot : user}" alt="${isAi ? "bot" : "user"}">
        </div>
        <div class="prose" id="${uniqueId}">${value}</div>
      </div>
    </div>
  `
}

const handleSubmit = async (e) => {
  e.preventDefault()

  const formData = new FormData(form!)

  if (!chatContainer) return

  chatContainer.innerHTML += chatStripe(false, formData.get("prompt"), "")

  form?.reset()

  const uniqueId = generateUniqueId()

  chatContainer.innerHTML += chatStripe(true, " ", uniqueId)

  chatContainer.scrollTop = chatContainer.scrollHeight

  const messageDiv = document.getElementById(uniqueId)

  loader(messageDiv)

  try {

    const response = await fetch(import.meta.env.VITE_SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: formData.get('prompt')
      })
    })

    if (!messageDiv) return

    clearInterval(loadInterval)
    messageDiv.innerHTML = ""

    if(response.ok) {
      const data = await response.json()
      typeText(messageDiv, data.bot.trim())
    }



  }catch (errors) {
    console.log(errors)
  }

}

form?.addEventListener("submit", handleSubmit)
form?.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    handleSubmit(e)
  }
})

