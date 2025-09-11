# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.

1. The parser cannot parse double quotes correctly. It just blindly splits at
   commas.
2. The parser fails to remove the enclosing double quotes when there is a pair.
3. It doesn't check if the data points conform to some given data structure, 
   like mixing "thirty" and numbers in the "age" field. Also, the parser could 
   produce an informing result when the quotes are not closed,
   and when there's missing entries.
4. The parser should have an option to specify what to do with spaces, ignoring
   them or keeping them. Behaviors on what happens when there is a mismatched 
   row length or missing/malformed input also depend (to some degree) space
   handling.

- #### Step 2: Use an LLM to help expand your perspective.


- #### Step 3: Propose enhancements in your project README file.

Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

1.  (extensibility) 
    As a user of the parser, I'm able to specify different delimiters and line 
    endings, so I can work with different csv files on different systems.
    This idea is from GPT.

    Acceptance criteria:
        The user can provide a delimiter or a set of delimiters.
        The delimiter should default to comma is not specified.
        The parser should automatically detect different line endings.

2.  (functionality) 
    As a user of the parser, I want to enclose my data entry by double quotes to 
    group data, so as to allow my data to contain the delimiters. Also, I want 
    to use the escaped double quotes to also allow uses of actual double quotes 
    in my data. I want my parser to ignore blank lines and process empty 
    entries correctly, so I can extract data from files not that well-formed.
    Idea from me and GPT.

    Acceptance criteria:
        The parser groups data in the enclosing, non-escaped double quotes.
        The parser should remove the enclosing double quotes when they exist.
        The parser should transform escaped double quotes into actual double 
        quotes in the output.
        The parser should ignore any blank lines.
        The parser should correctly produce blank entries from consecutive 
        delimiters.

3.  (functionality)
    As a user of the parser, I want to validate my data and be informed if 
    something goes wrong, so I know if there is a problem with the csv file and 
    can fix the issue. I want to transform my data to a different data type 
    so that I can work with it directly without doing it myself.
    Idea from me and GPT.

    Acceptance criteria:
        The parser supports a Zod schema and validates the data.
        The parser should give informing messages when there's an error, such 
        as mismatched data type, missing entry, mismatched double quotes.
        The user should be allowed to specify what to do if there's an error of 
        certain kind.
        The parser should default to stop any processing unless instructed by 
        the user.
        The parser should transform the data the way the user specifies, if it 
        passed validation.

4.  (extensibility)
    As a user of the parser, I want to indicate if there's a header row, so 
    the parser could group data and I can access entries with header name 
    conveniently. I also want to specify what to do with spaces, so my 
    data can contain leading or trailing spaces if necessary.
    Idea from me.

    Acceptance criteria:
        The parser produces a list of objects when the user indicates they want 
        objects. When there's a header, the objects have field names as indicated 
        by the header. Otherwise, the structure must be given by the user.
        The parser should not include the header in output.
        The parser should leave leading and trailing spaces as is if the user 
        wants.


Include your notes from above: what were your initial ideas, what did the LLM 
suggest, and how did the results differ by prompt? What resonated with you, 
and what didn’t? (3-5 sentences.) 

I listed my initial ideas in step 1.

One common thing ChatGPT suggested was support for different delimiters.
The data may be splitted not by commas but by semicolons or pipes and so 
on. I didn't think of this, but I think this is a pretty valid point.

It mentioned the importance of error handling when there's something 
wrong. In one conversation it said it's better to make error strategy 
configurable, such as "throw error" or "skip bad rows". It mentioned 
we can also pad if there's a mismatched row length. Indeed, as a user, 
I want this degree of control over the parser's behavior.

It suggested we might want to support multiple input kinds, such as buffer 
or string objects, in addition to file path. We should make encoding 
configurable, instead of defaulting to utf8 every time. While these are good 
points, I don't feel this is the priority for now.

When it comes to edge cases:
It catched a particular point that line ending may differ on different platforms.
It could be \n, \r\n, or just \r. Also, an important case is when the input file 
has zero length, only the header, or only empty lines. A more important one is 
the escaped double quote. The entry itself can contain escaped double quotes ""
to indicate an actual double quote, rather than the enclosing quotes to group 
the data. Our parser must be able to differentiate them.

GPT produced pretty clear and easy-to-understand reply using the original prompt.
If I add "Think carefully from the perspective of users, i.e. other developers 
using my parser," then the reply immediately becomes stuffed with jargons and 
technical details, many of which I cannot understand immediately. 
If I mention "I'm a student," GPT would output much more detailed bulletpoints,
still readable, mildly stuffed by jargons, than the original prompt.

### Design Choices

### 1340 Supplement

- #### 1. Correctness

- #### 2. Random, On-Demand Generation

- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs:
#### Tests:
#### How To…

#### Team members and contributions (include cs logins):
#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
ChatGPT for conceptual and design questions on step 2 and 3.
Copilot for code completion. I used it for writing expect-toEqual lines 
in the tests. I checked them line by line to make sure it matches the desired 
output.

#### Total estimated time it took to complete project:
3hrs

#### Link to GitHub Repo:  
https://github.com/cs0320-f25/typescript-csv-lixing-w