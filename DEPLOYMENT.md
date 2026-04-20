# Deployment Notes

## Recommended path

1. Push `D:\Icelab\JCIE\website` to GitHub.
2. Import the repo into Vercel.
3. Set the production domain.
4. Replace placeholder content in `src/content/site.ts`.
5. Trigger the first production deploy.

## Information needed from the lab

- Official contact email
- Application form URL or recruitment mailbox flow
- Official domain or subdomain
- GitHub organization or repo link
- Logo / partner branding assets
- First batch of projects, papers, or activity highlights

## Application form email delivery

The `/join` form posts to `/api/apply`, which sends an email through Resend.

Set these Vercel environment variables:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL=baowen435@gmail.com`
- `CONTACT_FROM_EMAIL=JCIE Applications <your-verified-sender@example.com>`

Until `RESEND_API_KEY` is configured, the form will ask applicants to email `baowen435@gmail.com` directly.

## Domain suggestions

- `jcie.szu.edu.cn`
- `jcie.szu-uos.org`
- `lab-jcie.vercel.app` for temporary launch

## Notes

- If you deploy behind a school server or mainland cloud host, domain filing / compliance may need to be checked by your side.
- The current project uses a placeholder site URL and contact email until final details are provided.
