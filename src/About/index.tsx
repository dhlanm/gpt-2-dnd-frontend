import React from 'react'
import { createStyles, Link as MaterialLink, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles(() =>
	createStyles({
		title: {
			color: '#7A200D',
			borderBottom: 'solid 2px #922510',
			fontVariant: 'small-caps',
		},
		paragraph: {
			marginTop: '1em',
			marginBottom: '1em',
			lineHeight: 1.3,
		},
	}),
)

const Link: React.FC<{ href: string }> = props => (
	<MaterialLink href={props.href} target="_blank" rel="noopener">{props.children}</MaterialLink>
)

const Title: React.FC = props => {
	const classes = useStyles()
	return <Typography variant="h5" className={classes.title}>{props.children}</Typography>
}

const Paragraph: React.FC = props => {
	const classes = useStyles()
	return <Typography variant="body1" className={classes.paragraph}>{props.children}</Typography>
}

const About: React.FC = () => (
	<>
		<Title>Overview</Title>
		<Paragraph>
			This generator creates monsters for <Link
			href="https://dnd.wizards.com/dungeons-and-dragons/what-is-dd">5th edition Dungeons and
			Dragons</Link> using <Link href="https://openai.com/blog/better-language-models/">OpenAI's
			GPT-2 model</Link>. I was inspired by <Link href="https://minimaxir.com/apps/gpt2-mtg/">minimaxir's
			Magic Card Generator</Link> and based the project off of his <Link
			href="https://github.com/minimaxir/gpt-2-simple">GPT-2 package</Link>. Be sure to check
			both out as they're very cool.
		</Paragraph>

		<Title>Data Sources</Title>
		<Paragraph>
			The data for this project is based off of <Link href="https://5e.tools">5e
			tools</Link>' bestiary, which is in well-formatted JSON. GPT-2 handles JSON impressively
			well, and manages to output valid JSON about 80% of the time at high temperatures, and
			closer to 100% of the time at low ones.
		</Paragraph>
		<Paragraph>
			I was unsatisfied with only using official data, so I also
			attempted to scrape <Link href="https://www.dndbeyond.com/homebrew/monsters">D&D
			Beyond's
			homebrew monsters</Link>. I only took the ones with a rating of 1 or higher (the
			generated results are zany enough without including such monsters as the "Big Funny").
			Conversion from the homebrew monster data to JSON can occasionally be incorrect, which
			may result in broken spellcasting blocks. If you notice issues during generation, this
			may be the cause.. However, the inclusion of the data more than doubles the training
			sample and helps prevent overfit. As a result, I have decided to keep it in. I also
			wrote a sampler to only pull the homebrew data 30% of the time while training, which
			mitigates these problems.
		</Paragraph>
		<Paragraph>
			The project currently generates a JSON description of the monster
			object, but it may be possible in the future to directly generate an HTML entity.
			Although this is not an immediate concern given the current success of the project,
			converting directly to HTML would circumvent any issues in converting homebrew monster
			data to JSON. Data normalization in this scenario would require both consistent syntax
			and semantics—in other words, the data would need to be well spaced, properly indented,
			and use the same tags everywhere.
		</Paragraph>

		<Title>Length Patch</Title>
		<Paragraph>
			The reason that HTML would need to be spaced as such, and the
			reason that the JSON is in the current model, is due to a technique this project uses
			for generating complete monster objects.. GPT-2 is not a fully open-sourced model, and
			was trained on Tensors of size 1024, so it can only generate blocks of text 1024 tokens
			in size at a time. Taking inspiration from <Link
			href="https://github.com/minimaxir/gpt-2-simple/pull/87">this pull request</Link>, I
			modified the gpt_2_simple code to use previously generated text as context to newly
			generated text, until a stop token is reached. This solution works, but means that the
			code necessarily loses context. For instance, I seed the name of the monster in a few
			places in the text to prevent gpt-2 from losing it. In a similar manner, the JSON stays
			well formatted because of the context of whitespace, as it's very rare that the
			generator has the context of the opening bracket by the time it reaches the closing one.
		</Paragraph>

		<Title>Prettification</Title>
		<Paragraph>
			Huge thanks to <Link href="https://github.com/el1t">Ellis Tsung</Link> for redoing the
			UI for me and making it into something beautiful. I'm deeply impressed by his
			fastidiousness in matching the design to official 5e material. You might also want to
			check out <Link href="https://github.com/Valloric/statblock5e">Valloric's 5e
			statblocks</Link>,
			which he based the design of the statblocks off of.
		</Paragraph>
	</>
)

export default About
