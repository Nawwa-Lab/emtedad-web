import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getDictionary } from "@/dictionary/get-dictionary";
import type { Locale } from "@/types";

export default async function Home({
	params,
}: {
	params: Promise<{ lang: Locale }>;
}) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return (
		<div className='relative w-[min(430px,94vw)]'>
			<Card>
				<CardHeader>
					<CardTitle>{dict.login.title}</CardTitle>
					<CardDescription>
						{dict.login.description}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Field>
						<FieldLabel htmlFor='email'> {dict.login.emailLabel}</FieldLabel>
						<Input id='email' type='email' placeholder='name@example.org' />
					</Field>
					<Field>
						<FieldLabel htmlFor='pass'> {dict.login.passwordLabel}</FieldLabel>
						<Input id='pass' type='password' placeholder='••••••••' />
					</Field>
				</CardContent>
				<CardFooter className='flex flex-col gap-4.5'>
					<Button className='w-full mt-2'>{dict.login.submit}</Button>
					<Button variant='link'>{dict.login.forgotPassword}</Button>
				</CardFooter>
			</Card>
			<p className='mt-5.5 font-semibold text-[12.5px]/[1.9] text-ink-soft text-center font-cairo'>
				{dict.login.invitation}
			</p>
		</div>
	);
}
