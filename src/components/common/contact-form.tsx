'use client';

import { useState } from 'react';

type ContactFormProps = {
  labels: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dates: string;
    gite: string;
    guests: string;
    message: string;
    submit: string;
    success: string;
    options: {
      bergerie: string;
      brassine: string;
      undecided: string;
    };
  };
};

export function ContactForm({ labels }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="surface-card grid gap-4 p-5 md:grid-cols-2 md:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <label className="grid gap-2 text-sm text-taupe-700">
        <span>{labels.firstName}</span>
        <input className="rounded-2xl border border-taupe-200 bg-white px-4 py-3 outline-none" name="firstName" />
      </label>
      <label className="grid gap-2 text-sm text-taupe-700">
        <span>{labels.lastName}</span>
        <input className="rounded-2xl border border-taupe-200 bg-white px-4 py-3 outline-none" name="lastName" />
      </label>
      <label className="grid gap-2 text-sm text-taupe-700">
        <span>{labels.email}</span>
        <input className="rounded-2xl border border-taupe-200 bg-white px-4 py-3 outline-none" name="email" type="email" />
      </label>
      <label className="grid gap-2 text-sm text-taupe-700">
        <span>{labels.phone}</span>
        <input className="rounded-2xl border border-taupe-200 bg-white px-4 py-3 outline-none" name="phone" />
      </label>
      <label className="grid gap-2 text-sm text-taupe-700">
        <span>{labels.dates}</span>
        <input className="rounded-2xl border border-taupe-200 bg-white px-4 py-3 outline-none" name="dates" placeholder="Ex. 12 au 14 septembre" />
      </label>
      <label className="grid gap-2 text-sm text-taupe-700">
        <span>{labels.gite}</span>
        <select className="rounded-2xl border border-taupe-200 bg-white px-4 py-3 outline-none" name="gite" defaultValue="undecided">
          <option value="bergerie">{labels.options.bergerie}</option>
          <option value="brassine">{labels.options.brassine}</option>
          <option value="undecided">{labels.options.undecided}</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm text-taupe-700">
        <span>{labels.guests}</span>
        <input className="rounded-2xl border border-taupe-200 bg-white px-4 py-3 outline-none" name="guests" type="number" min="1" max="2" defaultValue="2" />
      </label>
      <div />
      <label className="grid gap-2 text-sm text-taupe-700 md:col-span-2">
        <span>{labels.message}</span>
        <textarea className="min-h-36 rounded-2xl border border-taupe-200 bg-white px-4 py-3 outline-none" name="message" />
      </label>
      <div className="md:col-span-2 flex flex-col gap-3">
        <button type="submit" className="button-primary w-full md:w-fit">
          {labels.submit}
        </button>
        {submitted ? <p className="text-sm text-sage">{labels.success}</p> : null}
      </div>
    </form>
  );
}
