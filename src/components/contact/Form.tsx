import { useState } from 'preact/hooks';

export default function Form() {
  const [responseMessage, setResponseMessage] = useState('');

  async function submit(e: SubmitEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch('/api/sendmail', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    if (data.message) {
      setResponseMessage(data.message);
    }
    form.reset();
  }

  return (
    <form
      onSubmit={(e) => submit(e)}
      class="mt-3 flex flex-col gap-y-6"
      name="contact"
      method="POST"
      data-netlify="true"
    >
      <div>
        <label for="full-name" class="sr-only">
          Full name
        </label>
        <input
          type="text"
          name="subject"
          id="full-name"
          autocomplete="name"
          class="block w-full appearance-none rounded-md border-0 bg-primary-50 px-4 py-4 text-base ring-1 ring-primary-900/40 transition placeholder:text-primary-950/60 hover:ring-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-primary-950 dark:ring-primary-200/40 dark:placeholder:text-primary-200/60 dark:hover:ring-primary-400 dark:focus:ring-primary-400"
          placeholder="Full name"
          required
        />
      </div>

      <div>
        <label for="email" class="sr-only">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          autocomplete="email"
          class="block w-full appearance-none rounded-md border-0 bg-primary-50 px-4 py-4 text-base ring-1 ring-primary-900/40 transition placeholder:text-primary-950/60 hover:ring-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-primary-950 dark:ring-primary-200/40 dark:placeholder:text-primary-200/60 dark:hover:ring-primary-400 dark:focus:ring-primary-400"
          placeholder="Email"
          required
        />
      </div>

      <div>
        <label for="message" class="sr-only">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          rows={3}
          class="block w-full appearance-none rounded-md border-0 bg-primary-50 px-4 py-4 text-base ring-1 ring-primary-900/40 transition placeholder:text-primary-950/60 hover:ring-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-primary-950 dark:ring-primary-200/40 dark:placeholder:text-primary-200/60 dark:hover:ring-primary-400 dark:focus:ring-primary-400"
          placeholder="Message"
        ></textarea>
      </div>

      <div class="flex flex-col items-center gap-8 lg:flex-row lg:gap-4">
        <button class="inline-flex items-center justify-center rounded-full border border-transparent bg-accent-600 px-5 py-3 text-base font-medium text-white transition hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:bg-accent-500 dark:text-primary-950 dark:hover:bg-primary-300 dark:focus-visible:outline-primary-400">
          SEND
        </button>
        {responseMessage && (
          <span class="text-center text-primary-950/60 dark:text-primary-200/60">
            {responseMessage}
          </span>
        )}
        <span class="text-center text-primary-950/60 dark:text-primary-200/60">
          This website does not collect any personal data.
        </span>
      </div>
    </form>
  );
}
