## Sprint Duration
~ 2.5 weeks

## Goals:
- Code was really ugly and hard to understand/modify, wanted to make it more maintainable.
- Add the ability to change the order of a list, that's a required feature for launch.

## Working Well:
- Getting a shload done
    - Learned about and implemented React Context and HOCs 
    - Boosted code coverage from ??? to 70+%
    - Refactored large chunk of codebase.
    - More grappling with Transition/Groups and CSSTransitions

## Could Be Improved:
- Doing too much at once.
    - Not branching/commiting changes in manageable chunks.
    - Leads to confusion when trying to undo something.
- Not using TDD
    - I made really great progress when I DID use TDD, but then I stopped.
    - Use TDD and try to measure how it helps.
- Not organized enough
    - I don't "plan it out", though I certainly ponder and research and experiment.
    - Use something like Clubhouse to break these things down into tasks, 
        which will help with "Doing too much at once"
- Not a maintainable pace
    - Really long hours, leaves me feeling accomplished but exhausted.
    - Use some sort of timer to take breaks, max 8hrs/day, etc...
- Grandma says don't work so hard
    -  Need to get out and move around

## Thoughts/Notes:
- Have each component manage it's own transition?
- How can I utilize HOCs to make these transitions easier to nest at the proper levels?
- Does the level at which CSSTransitions appear in relation to the TransitionGroup matter?
    i.e. Do they have to be Child/Parent? Can CSSTransitions be inside of sortable?
- Does the SortableElement HOC mess with the lifecycle of nested CSSTransitions?


## Focus for next spring:
- Plan: Find a free kanban tool
- Use TDD: ...
- Work at a maintainable pace
