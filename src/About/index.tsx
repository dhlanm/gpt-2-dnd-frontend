import React from 'react'
import { Container, Link as MaterialLink } from '@material-ui/core'

const Link: React.FC<{ href: string }> = props => (
	<MaterialLink href={props.href} target="_blank" rel="noopener">{props.children}</MaterialLink>
)

const About: React.FC = () => (
	<Container>
		<h4>Overview</h4>
		<p>This generator creates monsters for <Link
			href="https://dnd.wizards.com/dungeons-and-dragons/what-is-dd">5th edition
			Dungeons and Dragons</Link> using <Link
			href="https://openai.com/blog/better-language-models/">OpenAI's GPT-2 model</Link>.
			I was inspired by <Link href="https://minimaxir.com/apps/gpt2-mtg/">minimaxir's
				Magic Card Generator</Link> and based the project off of his <Link
				href="https://github.com/minimaxir/gpt-2-simple">GPT-2 package</Link>. Be sure
			to check both out, as they're very cool.</p>
		<h4>Data sources</h4>
		<p>The data for this project is based off of <Link
			href="5e.tools">5e tools</Link>' bestiary, which is in well-formatted JSON. GPT-2
			handles JSON impressively well, and manages to output valid JSON about 80% of
			the time at high temperatures, and closer to 100% of the time at low ones.</p>
		<p>I was unsatisfied with only using official data, so I also
			attempted a scrape of <Link href="https://www.dndbeyond.com/homebrew/monsters">D&D
				Beyond's homebrew monsters</Link>. I only took the ones with a rating of 1 or
			higher (the generated results are zany enough without including such monsters as
			the "Big Funny"). Currently, my conversion of these scraped monsters to JSON is
			a bit broken, so spellcasting blocks are often messed up, which can translate to
			the results you see from the generator. However, the more-than-doubling of size
			of the dataset helps with overfit enough I deemed it worthwhile. I also wrote a
			sampler to only pull the homebrew data 30% of the time while training, which I
			think helps.</p>
		<p>It may have been possible to instead of converting to JSON,
			simply generate HTML from the get-go. This is something I might try in the
			future, but for now I'm happy enough with the current results. I think in doing
			this, it would be important to first format the HTML to be well-spaced, tabbing
			in as you nest.</p>
		<h4>Length patch</h4>
		<p>The reason that HTML would need to be spaced as such, and
			the reason that the JSON is, is due to the way I was forced to handle creating
			complete monster objects. GPT-2 is not a fully open-sourced model, and was
			trained on Tensors of size 1024, so it can only generate blocks of text 1024
			tokens in size at a time. Taking inspiration from <Link
				href="https://github.com/minimaxir/gpt-2-simple/pull/87">this pull
				request</Link>, I modified the gpt_2_simple code to use previously generated
			text as context to newly generated text, until a stop token is reached. This
			solution works, but means that the code necessarily loses context. For instance,
			I seed the name of the monster in a few places in the text, as gpt-2 will
			usually lose it otherwise. I believe the JSON stays well formatted because of
			the context of whitespace, as it's very rare that the generator has the context
			of the opening bracket by the time it reaches the closing one.</p>
		<h4>Prettification</h4>
		<p>I used <Link href="https://github.com/Valloric/statblock5e">Valloric's
			5e statblocks</Link> to display the stats. I'm impressed with the attention to
			detail he put in in making these as close to offical looking as possible, and he
			made them much prettier than I would have been able to. I also used <Link
				href="https://materializecss.com">Materialize</Link> for the website formatting
			because it's the only way I know how to make a pretty UI...</p>
	</Container>
)

export default About