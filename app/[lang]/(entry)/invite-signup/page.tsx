import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getDictionary } from "@/i18n/dictionary/get-dictionary";
import type { Locale } from "@/types";
import Link from "next/link";


export default async function Home({
	params,
}: {
	params: Promise<{ lang: Locale }>;
}) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return (
		<div className='relative w-[min(430px,94vw)]  '>
			<Card>
				<div className='flex items-center gap-3 bg-sage border-line-soft rounded-2xl px-3.5 py-4 mb-5.5'>
					<span className='w-9.5 h-9.5 shrink-0 rounded-[50%] bg-green grid place-items-center font-display font-bold text-[16px] text-ink ' aria-hidden='true'>
						م
					</span>
					<span className="font-cairo font-bold text-[13.5px] leading-[1.8] ">
						مؤسسة <b className="text-green-deep">مشكاة</b> بتدعوك تنضم لفريقها على امتداد.
					</span>
				</div>
				<CardHeader>
					<CardTitle>{dict.inviteSignup.title}</CardTitle>
					<CardDescription>
						{dict.inviteSignup.description}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Field>
						<FieldLabel htmlFor='name'> {dict.inviteSignup.name}</FieldLabel>
						<Input id='name' type='text' placeholder='اسمك هنا' />
					</Field>
					<Field>
						<FieldLabel htmlFor='email'> {dict.inviteSignup.emailLabel}</FieldLabel>
						<Input id='email' type='email' placeholder='name@example.org' />
						<FieldLabel htmlFor='email' className="font-semibold text-[11.5px] mb-1.5 "> {dict.inviteSignup.emailNote}</FieldLabel>
					</Field>
					<Field>
						<FieldLabel htmlFor='pass'> {dict.inviteSignup.passwordLabel}</FieldLabel>
						<Input id='pass' type='password' placeholder='٨ حروف علي الأقل' />
					</Field>
					<Field>
						<FieldLabel htmlFor='pass'> {dict.inviteSignup.passwordRepeatLabel}</FieldLabel>
						<Input id='pass' type='password' placeholder='••••••••' />
					</Field>
					<FieldContent className=" flex-row items-start gap-2.5 mt-5 my-0">
						<Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" />
						<FieldLabel htmlFor='terms-checkbox-basic'> {dict.inviteSignup.firstPart}
							<Link href="" className="text-green-deep font-bold hover:underline " > {dict.inviteSignup.link}</Link>
							{dict.inviteSignup.secondPart}
						</FieldLabel>
					</FieldContent>
				</CardContent>

				<CardFooter className='flex flex-col gap-4.5'>
					<Button className='w-full mt-2'>{dict.inviteSignup.submit}</Button>
					<Button variant='link'>{dict.inviteSignup.alreadyAMember}</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
