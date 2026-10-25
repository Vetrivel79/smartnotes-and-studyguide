/**
 * SMART STUDY ASSISTANT - CAPSTONE 41
 * Transform Lecture Notes into Smart Study Materials with Google NotebookLM
 * Core Client-side Application Logic (Vanilla JavaScript ES6+)
 */

// ==========================================================================
// 1. DEFAULT DATA REPOSITORY & LOCALSTORAGE SEEDING
// ==========================================================================

const DEFAULT_SAMPLE_STUDY_GUIDES = {
  "os-structure": {
    id: "os-structure",
    title: "Operating System Structure & Architectural Models",
    subject: "Operating Systems (CSE301)",
    unit: "Unit 1: System Architectures",
    tag: "Core Architecture",
    definitions: [
      {
        term: "Operating System Kernel",
        definition: "The core program running at all times on the computer after booting, acting as the intermediary between computer hardware and user application software."
      },
      {
        term: "Dual-Mode Operation",
        definition: "Hardware support providing at least two separate modes of execution: User Mode (mode bit 1) for user programs and Kernel/Supervisor Mode (mode bit 0) for privileged instructions."
      },
      {
        term: "System Call (Trap)",
        definition: "A software-generated interrupt triggered by user applications to request privileged services directly from the kernel (e.g., read, write, fork, execve)."
      }
    ],
    keyPoints: [
      "Monolithic Kernels (e.g., traditional Linux/Unix) pack all OS services (file systems, networking, memory management) in kernel space for ultra-fast performance.",
      "Microkernels (e.g., Mach, QNX) minimize kernel code by keeping only IPC, basic scheduling, and virtual memory in kernel mode; file systems and drivers run as user-level daemons.",
      "System Calls transition the CPU from user mode to kernel mode via hardware trap instructions, preserving processor state.",
      "Layered Approach organizes the OS into N layers; layer 0 is hardware and layer N is user interface, ensuring modular verification."
    ],
    examPrep: "Frequent Viva Question: Differentiate Monolithic vs Microkernel architecture. Memorize the 5 major types of system calls: Process Control, File Management, Device Management, Information Maintenance, and Communications."
  },

  "process-scheduling": {
    id: "process-scheduling",
    title: "Process Scheduling Algorithms & CPU Dispatching",
    subject: "Operating Systems (CSE301)",
    unit: "Unit 2: Process Management",
    tag: "Algorithms & Scheduling",
    definitions: [
      {
        term: "Process Control Block (PCB)",
        definition: "A critical data structure in the kernel storing process state, program counter, CPU registers, CPU scheduling information, memory management data, and I/O status."
      },
      {
        term: "Context Switch",
        definition: "The operation of saving the current CPU execution state of a running process and restoring the saved state of another process selected by the short-term scheduler."
      },
      {
        term: "Preemptive vs Non-Preemptive",
        definition: "In preemptive scheduling, the OS can forcefully interrupt a running process (e.g., Round Robin, SRTF); in non-preemptive, a process holds the CPU until it terminates or enters waiting state (e.g., FCFS)."
      }
    ],
    keyPoints: [
      "First-Come, First-Served (FCFS): Simple FIFO queue; suffers from Convoy Effect where short processes queue behind one massive CPU-bound task.",
      "Shortest Job First (SJF): Provably optimal in minimizing average waiting time; however, predicting exact next CPU burst time is practically impossible without exponential averaging.",
      "Round Robin (RR): Preemptive algorithm using a fixed time quantum (q); if q is too large, it degenerates into FCFS; if q is too small, context-switch overhead dominates.",
      "Multi-Level Feedback Queue (MLFQ): Processes move between multiple priority queues based on CPU burst history, preventing starvation of I/O-bound interactive tasks."
    ],
    examPrep: "Key Numerical Problem: Calculate Average Waiting Time (AWT) and Average Turnaround Time (TAT) using Gantt charts for FCFS vs Round Robin (quantum = 2ms)."
  },

  "deadlock": {
    id: "deadlock",
    title: "Deadlocks & Coffman Conditions",
    subject: "Operating Systems (CSE301)",
    unit: "Unit 3: Synchronization & Deadlocks",
    tag: "Resource Allocation",
    definitions: [
      {
        term: "Deadlock",
        definition: "A situation where a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process in the set."
      },
      {
        term: "Banker's Algorithm",
        definition: "A deadlock avoidance algorithm developed by Edsger Dijkstra that tests for safety by simulating the allocation of predetermined maximum possible amounts of all resources."
      },
      {
        term: "Resource Allocation Graph (RAG)",
        definition: "A directed graph where vertices represent processes (circles) and resource types (rectangles); claim/request edges point from process to resource, and assignment edges point from resource instance to process."
      }
    ],
    keyPoints: [
      "The 4 Necessary Coffman Conditions: 1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption, 4. Circular Wait. If any one condition is invalidated, deadlock cannot occur.",
      "Deadlock Prevention: Eliminates deadlock by constraining resource requests to break at least one of the 4 Coffman conditions (e.g., strictly ordering all resource allocations numerically).",
      "Deadlock Avoidance: The OS requires a priori information regarding which resources a process will claim during its lifetime, granting requests only if the system remains in a 'Safe State'.",
      "Deadlock Detection & Recovery: Allows deadlocks to happen, runs cycle detection algorithms, and recovers by process termination or resource preemption with rollback."
    ],
    examPrep: "Banker's Algorithm Safe Sequence Table calculation is guaranteed in semester finals. Remember formula: Need Matrix = Max Matrix - Allocation Matrix."
  },

  "memory-management": {
    id: "memory-management",
    title: "Main Memory Management & Dynamic Partitioning",
    subject: "Operating Systems (CSE301)",
    unit: "Unit 4: Memory Management",
    tag: "Physical Memory",
    definitions: [
      {
        term: "Logical vs Physical Address Space",
        definition: "Logical address (virtual address) is generated by the CPU during execution; Physical address is the actual memory cell location in the RAM chips loaded by the Memory Management Unit (MMU)."
      },
      {
        term: "Internal Fragmentation",
        definition: "Unused memory space left inside a fixed-size allocated partition or page frame because the process requested less than the block size."
      },
      {
        term: "External Fragmentation",
        definition: "Free memory space is broken up into tiny non-contiguous slivers across RAM such that the total free memory is sufficient, but no single contiguous block can satisfy a new allocation request."
      }
    ],
    keyPoints: [
      "Dynamic Partitioning Strategies: First-Fit (allocates first sufficient hole), Best-Fit (allocates smallest hole that fits), Worst-Fit (allocates largest available hole).",
      "Compaction: Technique to eliminate external fragmentation by shuffling memory contents to place all free memory together in one large contiguous block; requires dynamic relocation.",
      "Base and Limit Registers: Hardware registers used by the CPU to protect memory address boundaries and prevent user processes from tampering with the OS kernel or other processes."
    ],
    examPrep: "Numerical alert: Be ready to trace memory allocation for processes of size 212KB, 417KB, 112KB, 426KB into partition holes of 100KB, 500KB, 200KB, 300KB, 600KB using First-Fit and Best-Fit."
  },

  "paging": {
    id: "paging",
    title: "Paging, Virtual Memory & TLB Architectures",
    subject: "Operating Systems (CSE301)",
    unit: "Unit 5: Virtual Memory Systems",
    tag: "Virtual Memory",
    definitions: [
      {
        term: "Paging",
        definition: "A memory management scheme that eliminates the need for contiguous allocation of physical memory by dividing physical RAM into fixed-size frames and logical address space into equal-sized pages."
      },
      {
        term: "Translation Lookaside Buffer (TLB)",
        definition: "A high-speed, associative hardware cache inside the CPU that stores recent virtual page-to-physical frame translations to avoid the latency of multi-level page table lookups."
      },
      {
        term: "Page Fault",
        definition: "A hardware interrupt raised by the MMU when a program accesses a memory page that is mapped in address space but not currently loaded into physical RAM."
      },
      {
        term: "Thrashing",
        definition: "A state where the system spends significantly more time swapping pages into and out of secondary storage than executing actual application instructions, causing CPU utilization to collapse."
      }
    ],
    keyPoints: [
      "Paging completely avoids External Fragmentation, but retains minor Internal Fragmentation in the final page frame of a process.",
      "Address Translation Formula: Logical address consists of Page Number (p) and Page Offset (d). Physical Address = (Frame Number f * Page Size) + Offset d.",
      "Page Replacement Algorithms: FIFO (suffers from Belady's Anomaly where more frames can cause more page faults), Optimal Replacement (OPT, theoretical benchmark), Least Recently Used (LRU, practical standard).",
      "Effective Memory Access Time (EMAT) = (TLB Hit Ratio * (TLB Search Time + Memory Access)) + ((1 - Hit Ratio) * (TLB Search Time + 2 * Memory Access))."
    ],
    examPrep: "Must know: Calculate Page Faults for reference string: 7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2 with 3 frames using FIFO, LRU, and OPT."
  }
};

const SAMPLE_QUIZ_QUESTIONS = [
  {
    id: 1,
    category: "Process Scheduling",
    question: "Which CPU scheduling algorithm is provably optimal in minimizing the average waiting time for a given set of stationary processes with known burst times?",
    options: [
      "First-Come, First-Served (FCFS)",
      "Shortest Job First (SJF / Non-preemptive)",
      "Round Robin (RR)",
      "Priority Scheduling with aging"
    ],
    correctAnswer: 1,
    explanation: "Shortest Job First (SJF) is provably optimal because scheduling a short process before a long process decreases the waiting time of the short process significantly more than it increases the waiting time of the long process."
  },
  {
    id: 2,
    category: "Deadlocks",
    question: "Which of the following is NOT one of the four Coffman conditions necessary for a system deadlock to occur?",
    options: [
      "Mutual Exclusion",
      "Hold and Wait",
      "Preemptive CPU Allocation",
      "Circular Wait"
    ],
    correctAnswer: 2,
    explanation: "The four Coffman conditions are Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. 'Preemption' actually prevents deadlock rather than enabling it."
  },
  {
    id: 3,
    category: "Virtual Memory",
    question: "In Virtual Memory management, what phenomenon is occurring when the operating system enters 'Thrashing'?",
    options: [
      "The hard drive has run out of physical disk space for swap files.",
      "The CPU spends significantly more time swapping pages in and out of secondary storage than executing user instructions.",
      "Two processes attempt to write to the same page table entry simultaneously.",
      "The page table size exceeds physical cache capacity."
    ],
    correctAnswer: 1,
    explanation: "Thrashing occurs when the working sets of active processes exceed available physical memory. The OS constantly handles page faults and swaps pages, causing CPU utilization to plummet toward zero."
  },
  {
    id: 4,
    category: "Memory Architecture",
    question: "What is the primary architectural purpose of the Translation Lookaside Buffer (TLB)?",
    options: [
      "To store backup copies of dirty pages before writing them to SSD.",
      "To serve as a high-speed associative hardware cache for page-number to frame-number address translations.",
      "To prevent unauthorized DMA transfers from peripheral network cards.",
      "To synchronize kernel thread contexts across heterogeneous CPU cores."
    ],
    correctAnswer: 1,
    explanation: "The TLB is an associative hardware cache in the MMU that stores recently accessed virtual-to-physical address mappings, preventing a secondary memory lookup for the page table on every memory access."
  },
  {
    id: 5,
    category: "Deadlocks",
    question: "The Banker's Algorithm is deployed in operating systems for which of the following purposes?",
    options: [
      "Deadlock detection and automatic process rollback.",
      "Deadlock avoidance by evaluating whether resource allocation leaves the system in a safe state.",
      "Preventing starvation in multi-level feedback queue scheduling.",
      "Encrypting stored user passwords in the shadow file."
    ],
    correctAnswer: 1,
    explanation: "The Banker's Algorithm is a Deadlock Avoidance algorithm that simulates resource allocation to ensure that at least one safe execution sequence exists before granting a requested resource."
  },
  {
    id: 6,
    category: "Operating System Functions",
    question: "Which mechanism or hardware instruction transitions the processor from unprivileged User Mode to privileged Kernel Mode?",
    options: [
      "A Trap or System Call instruction",
      "A standard high-level return statement",
      "A CPU clock frequency throttle",
      "A cache invalidation barrier"
    ],
    correctAnswer: 0,
    explanation: "A Trap (software interrupt or system call) switches the hardware mode bit from 1 (User mode) to 0 (Kernel mode), invoking the kernel's system call dispatch handler safely."
  },
  {
    id: 7,
    category: "Memory Management",
    question: "What causes 'External Fragmentation' in contiguous dynamic memory partitioning?",
    options: [
      "Allocating memory blocks larger than what the requesting process asked for.",
      "Free memory is broken up into small, scattered non-contiguous holes that cannot satisfy large contiguous allocation requests.",
      "The page table entry contains an invalid frame number.",
      "The stack segment overflows into the heap segment."
    ],
    correctAnswer: 1,
    explanation: "External fragmentation occurs when total free memory is technically sufficient to satisfy a request, but the available storage is split into multiple small non-contiguous blocks."
  },
  {
    id: 8,
    category: "Paging & Algorithms",
    question: "Belady's Anomaly describes a counter-intuitive phenomenon where increasing the number of page frames leads to more page faults. Which page replacement algorithm suffers from this?",
    options: [
      "Least Recently Used (LRU)",
      "First-In, First-Out (FIFO)",
      "Optimal Page Replacement (OPT)",
      "Clock Algorithm (Second Chance)"
    ],
    correctAnswer: 1,
    explanation: "FIFO page replacement can exhibit Belady's Anomaly because FIFO does not possess the 'stack property' that ensures the set of pages in an n-frame memory is always a subset of an (n+1)-frame memory."
  },
  {
    id: 9,
    category: "Process Management",
    question: "In Unix-like operating systems (Linux, macOS), what is the return value of the fork() system call to the newly created child process?",
    options: [
      "A negative error code (-1)",
      "The PID of the parent process",
      "0 (zero)",
      "A newly allocated file descriptor index"
    ],
    correctAnswer: 2,
    explanation: "The fork() system call returns the child's new PID to the parent process, and returns 0 to the child process, allowing the code to differentiate whether it is running as parent or child."
  },
  {
    id: 10,
    category: "Process Synchronization",
    question: "Which synchronization primitive consists of an integer variable that, apart from initialization, is accessed only through the atomic wait() and signal() operations?",
    options: [
      "Counting Semaphore",
      "Condition Variable",
      "Message Queue Pipe",
      "Spinlock Barrier"
    ],
    correctAnswer: 0,
    explanation: "A Semaphore is an integer synchronization primitive proposed by Dijkstra, accessed strictly via atomic wait() (or P()) and signal() (or V()) operations to enforce mutual exclusion or resource counting."
  }
];

const SAMPLE_OS_FAQS = [
  {
    id: "faq-1",
    question: "What is the key difference between a Process and a Thread?",
    category: "Process Management",
    answer: "A Process is an active executing program with its own dedicated memory address space, PCB, file descriptors, and security context. A Thread is a lightweight unit of CPU utilization that exists inside a process, sharing the parent process's code segment, data segment, and open files, but having its own private program counter, register set, and execution stack."
  },
  {
    id: "faq-2",
    question: "How does Deadlock Prevention differ from Deadlock Avoidance?",
    category: "Deadlocks",
    answer: "Deadlock Prevention imposes strict design rules that make deadlock structurally impossible by ensuring that at least one of the four Coffman conditions (Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait) can never hold. In contrast, Deadlock Avoidance allows all four conditions to exist, but dynamically evaluates every resource request using algorithms like Banker's Algorithm to ensure the system never transitions into an unsafe state."
  },
  {
    id: "faq-3",
    question: "What causes Thrashing in virtual memory and how does the OS recover?",
    category: "Virtual Memory",
    answer: "Thrashing occurs when the total working sets of all running processes exceed the physical capacity of RAM. The CPU ends up spending almost 100% of its time servicing page faults and reading/writing pages to disk rather than executing user code. The OS can resolve thrashing by suspending one or more processes (swapping them out entirely to disk), using the Working Set Model or Page-Fault Frequency (PFF) strategy."
  },
  {
    id: "faq-4",
    question: "What happens during a TLB Miss in modern hardware architectures?",
    category: "Memory Architecture",
    answer: "When a CPU generates a virtual address and the page-to-frame translation is absent from the Translation Lookaside Buffer (TLB Miss), the Memory Management Unit (or OS page fault handler in software-managed TLBs) traverses the multi-level page table hierarchy in physical RAM. Once the corresponding page table entry is retrieved, the frame number is loaded into the TLB for future fast lookups."
  },
  {
    id: "faq-5",
    question: "Why can't Shortest Job First (SJF) scheduling be implemented directly in general-purpose OSes?",
    category: "CPU Scheduling",
    answer: "SJF requires prior knowledge of the exact CPU burst duration of each arriving process, which is fundamentally impossible for interactive or network-driven programs to predict with absolute certainty. General-purpose OSes approximate SJF using exponential averaging of past bursts or Multi-Level Feedback Queues (MLFQ)."
  },
  {
    id: "faq-6",
    question: "What are the trade-offs between Monolithic Kernels and Microkernels?",
    category: "OS Architecture",
    answer: "Monolithic kernels (Linux) execute core services (networking, file systems, IPC, drivers) in supervisor mode within the same address space, providing maximum execution speed at the cost of vulnerability (a bug in a driver can crash the entire OS). Microkernels (Minix, QNX) run only minimal functions in kernel mode and execute drivers/file systems in user space, offering high fault tolerance and modularity at the expense of IPC message-passing overhead."
  },
  {
    id: "faq-7",
    question: "What is Belady's Anomaly and which page replacement algorithm is immune?",
    category: "Paging & Memory",
    answer: "Belady's Anomaly is the counter-intuitive phenomenon where increasing the number of physical page frames results in an increased number of page faults. It occurs in FIFO page replacement. Algorithms with the 'stack property', such as Least Recently Used (LRU) and Optimal (OPT), are mathematically immune to Belady's Anomaly."
  },
  {
    id: "faq-8",
    question: "What is the difference between a Binary Semaphore and a Mutex?",
    category: "Synchronization",
    answer: "A Mutex (Mutual Exclusion object) has ownership semantics: only the thread that locked the mutex is allowed to unlock it, making it ideal for protecting critical sections. A Binary Semaphore is a signaling mechanism with no ownership: one thread can signal wait(), and an entirely different thread can issue signal(), making semaphores suitable for inter-thread task synchronization."
  }
];

const TIMELINE_TOPICS = [
  {
    id: "t1",
    step: "01",
    title: "Introduction to Operating Systems & Kernels",
    desc: "Explore the evolution of operating systems, kernel architectures (Monolithic vs Microkernel), system calls, and dual-mode CPU execution.",
    tags: ["OS Concept", "Kernel vs User Mode", "Traps & Interrupts", "System Calls"],
    mastered: true
  },
  {
    id: "t2",
    step: "02",
    title: "Process Management & Inter-Process Communication",
    desc: "Understand Process Control Blocks (PCBs), process states, fork() and execve(), thread concurrency, context switching, and IPC pipelines.",
    tags: ["PCB Structure", "Process States", "fork() System Call", "Threads"],
    mastered: true
  },
  {
    id: "t3",
    step: "03",
    title: "CPU Scheduling Algorithms & Metrics",
    desc: "Master calculation of Average Waiting Time and Turnaround Time using FCFS, SJF, SRTF, Round Robin with quantum evaluation, and MLFQ.",
    tags: ["Gantt Charts", "SJF Optimality", "Round Robin Quantum", "Convoy Effect"],
    mastered: false
  },
  {
    id: "t4",
    step: "04",
    title: "Process Synchronization & Deadlocks",
    desc: "Solve critical section problems with Peterson's algorithm and Semaphores. Analyze Coffman conditions and calculate Banker's algorithm safe sequences.",
    tags: ["Semaphores & Mutex", "Critical Section", "Coffman Conditions", "Banker's Algorithm"],
    mastered: false
  },
  {
    id: "t5",
    step: "05",
    title: "Main Memory Management & Paging",
    desc: "Study contiguous allocation, internal vs external fragmentation, paging address translation formulas, and Translation Lookaside Buffer (TLB) hit ratios.",
    tags: ["Fragmentation", "Page Tables", "TLB Caching", "Address Translation"],
    mastered: false
  },
  {
    id: "t6",
    step: "06",
    title: "Virtual Memory, Page Replacement & File Systems",
    desc: "Understand demand paging, page faults, FIFO, LRU, Optimal page replacement, Belady's Anomaly, Thrashing, and File Allocation Tables (FAT / Inodes).",
    tags: ["Page Fault Interrupt", "FIFO vs LRU", "Thrashing & Working Set", "File Inodes"],
    mastered: false
  }
];

const PROMPTS_DATABASE = [
  {
    id: "p1",
    category: "guides",
    categoryLabel: "Study Guides",
    title: "High-Yield Study Guide Generator",
    description: "Generates an exam-ready study guide with definitions, formulas, and key concepts grounded strictly in lecture slides.",
    prompt: `You are an expert college professor in Computer Science.
Analyze the uploaded lecture PDF sources for the topic: "[ENTER TOPIC NAME]".
Generate a structured, high-yield study guide containing:
1. Executive Overview (2-3 sentences)
2. 5 Key Definitions (with exact technical terminology from the slides)
3. Core Mechanisms & Algorithms (step-by-step working principles)
4. Critical Formulas / Mathematical Equations (if applicable)
5. Exam Preparation Callout: Top 3 likely exam questions and common student pitfalls.
Ground all answers strictly in the uploaded sources with citation tags.`
  },
  {
    id: "p2",
    category: "summaries",
    categoryLabel: "Summaries",
    title: "Lecture Chapter Summarizer (Short / Medium / Detailed)",
    description: "Extracts an executive summary of complex technical slide decks with granular bullet points.",
    prompt: `Review the uploaded lecture materials regarding "[ENTER TOPIC/CHAPTER]".
Synthesize a comprehensive summary formatted as follows:
- Main Objective: What problem does this OS concept or algorithm solve?
- Key Architectural Components: List and explain the primary data structures or system components.
- Pros vs Cons Analysis: Provide a bulleted comparison of advantages and trade-offs.
- Final Recap: 3 key bullet points a student must memorize before walking into an exam.
Keep all points faithful to the slide sources.`
  },
  {
    id: "p3",
    category: "quizzes",
    categoryLabel: "Quizzes & FAQs",
    title: "10 MCQ Exam Practice Generator",
    description: "Instructs NotebookLM to generate multiple-choice questions with 4 options and detailed explanations.",
    prompt: `Based strictly on the attached lecture materials on "[ENTER SUBJECT/TOPIC]":
Create 10 Multiple-Choice Questions (MCQs) for an undergraduate university exam.
Requirements:
- 4 clear options for each question (A, B, C, D).
- Exactly one correct answer.
- Provide a detailed explanation for why the correct option is right and why the distractors are wrong.
- Reference the slide number or section where the concept originates.`
  },
  {
    id: "p4",
    category: "quizzes",
    categoryLabel: "Quizzes & FAQs",
    title: "Oral Viva & FAQ Extractor",
    description: "Extracts the most probable verbal examination questions professors ask during lab viva.",
    prompt: `Act as a senior university examiner for Computer Science & Engineering.
Read through the uploaded lecture notes and extract the top 8 'Oral Viva' questions.
For each question:
- State the question clearly as a professor would ask in an examination.
- Provide the concise, technically precise 2-3 sentence answer expected from an honors student.
- Include one follow-up counter-question that tests edge-case understanding.`
  },
  {
    id: "p5",
    category: "guides",
    categoryLabel: "Study Guides",
    title: "Chronological Concept Timeline Generator",
    description: "Organizes broad, scattered lecture topics into a progressive, logical curriculum roadmap.",
    prompt: `Analyze the uploaded course documents and organize the topics into a logical study timeline.
Order the topics from foundational prerequisites to advanced implementations.
For each milestone:
- Milestone Title & Estimated Study Hours
- Prerequisite Knowledge Needed
- Key Concepts Covered
- Mastery Check: What should the student be able to code or calculate upon finishing?`
  },
  {
    id: "p6",
    category: "accuracy",
    categoryLabel: "Verification",
    title: "NotebookLM Audio Overview Fact-Check Auditor",
    description: "Prompts NotebookLM to verify its own 2-host audio podcast script against source slides.",
    prompt: `Listen to or examine the Audio Overview generated for "[TOPIC]".
Cross-check every analogy and technical claim made by the hosts against the uploaded lecture PDFs.
Report:
1. Did the audio hosts make any oversimplifications that contradict official technical definitions?
2. Were any critical edge cases or exceptions omitted?
3. Provide page/slide citations verifying the discussion points on [Specific Algorithm].`
  },
  {
    id: "p7",
    category: "accuracy",
    categoryLabel: "Verification",
    title: "Source Grounding & Hallucination Detector",
    description: "Audit check prompt to ensure no external AI assumptions leaked into study materials.",
    prompt: `Review the following generated study notes:
\"\"\"[PASTE GENERATED TEXT HERE]\"\"\"
Compare this text against the uploaded lecture PDF sources.
For each paragraph:
- Confirm if this statement is directly supported by the sources (citing source numbers).
- Highlight any statement that is NOT found in the source or represents an ungrounded assumption.
- Flag any definitions that contradict standard textbook definitions.`
  }
];

const VERIFICATION_CHECKLIST_TEMPLATE = [
  { id: "v1", label: "Is the answer supported by the original lecture PDF?", hint: "Check that citations [1], [2] map to actual slide content." },
  { id: "v2", label: "Is the technical explanation correct?", hint: "Verify that algorithms and formulas match standard CSE definitions." },
  { id: "v3", label: "Are important concepts or edge cases missing?", hint: "Ensure boundary conditions (e.g. quantum size, deadlock preemption) are stated." },
  { id: "v4", label: "Is the information outdated or conflicting with syllabus?", hint: "Check compatibility with your professor's specific syllabus and conventions." },
  { id: "v5", label: "Does the answer contain unsupported claims?", hint: "Look out for generalized AI claims without source attribution." },
  { id: "v6", label: "Does the answer contain unsafe or incorrect advice?", hint: "Check code syntax, memory pointer calculations, and math steps." },
  { id: "v7", label: "Are source references and slide numbers available?", hint: "Confirm specific slide or page numbers are marked." },
  { id: "v8", label: "Has the audio overview been checked against slides?", hint: "Listen to verify that podcast analogies did not distort technical facts." }
];

// Sample preloaded summaries
const SAMPLE_SUMMARIES = {
  "Process Synchronization & Critical Section": {
    subject: "Operating Systems",
    topic: "Process Synchronization & Critical Section",
    length: "Medium",
    content: `### Executive Summary: Process Synchronization (Operating Systems)

**Core Problem:**
When multiple concurrent processes access and manipulate shared data concurrently (Race Condition), the outcome depends on the particular order in which access takes place. The Critical Section is the portion of code where shared resources are altered.

**The Three Mandatory Requirements for Critical Section Solutions:**
1. **Mutual Exclusion:** If process P_i is executing in its critical section, no other processes can execute in their critical sections.
2. **Progress:** If no process is executing in its critical section and some processes wish to enter, only those processes not executing in their remainder sections can participate in deciding who enters next.
3. **Bounded Waiting:** A bound must exist on the number of times other processes are allowed to enter their critical sections after a process has made a request to enter.

**Key Synchronization Primitives:**
- **Peterson's Solution:** Classic 2-process software solution using shared variables \`boolean flag[2]\` and \`int turn\`. Meets all 3 criteria for two processes.
- **Semaphores:** Integer variable accessed via atomic \`wait()\` (decrement) and \`signal()\` (increment). Counting semaphores control resource pools; Binary semaphores act as mutex locks.
- **Monitors:** High-level synchronization construct encapsulating private data and public synchronization methods with condition variables (\`wait()\`, \`signal()\`).

*Verified against Galvin OS 10th Ed Chapter 6 & Lecture 14 Slides.*`
  }
};

// ==========================================================================
// 2. APPLICATION STATE MANAGEMENT (localStorage wrapper)
// ==========================================================================

const AppState = {
  // Key names in localStorage
  KEYS: {
    DOCS: "ssa_lecture_docs",
    CUSTOM_GUIDES: "ssa_custom_guides",
    SAVED_SUMMARIES: "ssa_saved_summaries",
    QUIZ_STATE: "ssa_quiz_state",
    FAQS: "ssa_faqs",
    TIMELINE: "ssa_timeline",
    VERIFICATION_CHECKS: "ssa_verification_checks",
    VERIFICATION_NOTES: "ssa_verification_notes",
    VERIFICATION_AUDITS: "ssa_verification_audits",
    COMPARISON_NOTES: "ssa_comparison_notes"
  },

  // Document list
  getUploadedDocs() {
    const data = localStorage.getItem(this.KEYS.DOCS);
    return data ? JSON.parse(data) : [];
  },
  setUploadedDocs(docs) {
    localStorage.setItem(this.KEYS.DOCS, JSON.stringify(docs));
    updateDashboardMetrics();
  },

  // Custom study guides
  getCustomGuides() {
    const data = localStorage.getItem(this.KEYS.CUSTOM_GUIDES);
    return data ? JSON.parse(data) : {};
  },
  saveCustomGuide(guide) {
    const guides = this.getCustomGuides();
    guides[guide.id] = guide;
    localStorage.setItem(this.KEYS.CUSTOM_GUIDES, JSON.stringify(guides));
    updateDashboardMetrics();
  },

  // Saved summaries
  getSavedSummaries() {
    const data = localStorage.getItem(this.KEYS.SAVED_SUMMARIES);
    return data ? JSON.parse(data) : SAMPLE_SUMMARIES;
  },
  saveSummary(summary) {
    const summaries = this.getSavedSummaries();
    const key = `${summary.subject} - ${summary.topic}`;
    summaries[key] = summary;
    localStorage.setItem(this.KEYS.SAVED_SUMMARIES, JSON.stringify(summaries));
    updateDashboardMetrics();
  },

  // Timeline
  getTimeline() {
    const data = localStorage.getItem(this.KEYS.TIMELINE);
    return data ? JSON.parse(data) : TIMELINE_TOPICS;
  },
  saveTimeline(timeline) {
    localStorage.setItem(this.KEYS.TIMELINE, JSON.stringify(timeline));
  },

  // Verification checks & notes
  getVerificationChecks() {
    const data = localStorage.getItem(this.KEYS.VERIFICATION_CHECKS);
    return data ? JSON.parse(data) : {};
  },
  saveVerificationChecks(checks) {
    localStorage.setItem(this.KEYS.VERIFICATION_CHECKS, JSON.stringify(checks));
    updateDashboardMetrics();
  },

  getVerificationAudits() {
    const data = localStorage.getItem(this.KEYS.VERIFICATION_AUDITS);
    return data ? JSON.parse(data) : [
      {
        id: "audit-1",
        date: "2026-10-24",
        topic: "Operating Systems - Unit 3 Deadlocks",
        verifier: "CSE Capstone Reviewer",
        status: "Fully Verified (8/8)",
        notes: "Verified Coffman conditions and Banker's algorithm against Lecture 18 slides."
      }
    ];
  },
  saveVerificationAudit(audit) {
    const audits = this.getVerificationAudits();
    audits.unshift(audit);
    localStorage.setItem(this.KEYS.VERIFICATION_AUDITS, JSON.stringify(audits));
    updateDashboardMetrics();
  },

  // FAQs
  getFAQs() {
    const data = localStorage.getItem(this.KEYS.FAQS);
    return data ? JSON.parse(data) : SAMPLE_OS_FAQS;
  },
  saveFAQ(faq) {
    const faqs = this.getFAQs();
    faqs.unshift(faq);
    localStorage.setItem(this.KEYS.FAQS, JSON.stringify(faqs));
  }
};

// ==========================================================================
// 3. UI NOTIFICATIONS & TOAST SYSTEM
// ==========================================================================

function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3200);
}

// Copy to clipboard helper
async function copyTextToClipboard(text, successMessage = "Copied to clipboard!") {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    showToast(successMessage, "success");
  } catch (err) {
    console.error("Clipboard copy failed: ", err);
    showToast("Failed to copy. Please manually select and copy text.", "warning");
  }
}

// ==========================================================================
// 4. NAVIGATION ROUTER
// ==========================================================================

function navigateToSection(targetSectionId) {
  // Update sidebar active buttons
  const navButtons = document.querySelectorAll(".nav-item");
  navButtons.forEach(btn => {
    if (btn.dataset.target === targetSectionId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Switch sections
  const sections = document.querySelectorAll(".content-section");
  let found = false;
  sections.forEach(section => {
    if (section.id === `section-${targetSectionId}`) {
      section.classList.add("active");
      found = true;
    } else {
      section.classList.remove("active");
    }
  });

  // Close mobile sidebar if open
  const sidebar = document.getElementById("app-sidebar");
  if (sidebar && sidebar.classList.contains("open")) {
    sidebar.classList.remove("open");
  }

  // Scroll main view to top
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (found) {
    history.replaceState(null, null, `#${targetSectionId}`);
  }
}

// Mobile sidebar toggle
function initMobileNavigation() {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const sidebar = document.getElementById("app-sidebar");

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }

  const navButtons = document.querySelectorAll(".nav-item");
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;
      navigateToSection(target);
    });
  });

  // Handle URL Hash if present
  const hash = window.location.hash.replace("#", "");
  if (hash && document.getElementById(`section-${hash}`)) {
    navigateToSection(hash);
  }
}

// ==========================================================================
// 5. DASHBOARD METRICS & RECENT CARDS
// ==========================================================================

function updateDashboardMetrics() {
  // 1. Total Documents
  const docs = AppState.getUploadedDocs();
  const docCountEl = document.getElementById("stat-doc-count");
  const navBadgeEl = document.getElementById("nav-badge-docs");
  if (docCountEl) docCountEl.textContent = docs.length;
  if (navBadgeEl) navBadgeEl.textContent = docs.length;

  const docSubtextEl = document.getElementById("stat-doc-subtext");
  if (docSubtextEl) {
    docSubtextEl.textContent = docs.length > 0 
      ? `${docs.length} lecture PDF${docs.length > 1 ? "s" : ""} organized`
      : "Selected & tracked in session";
  }

  // 2. Study Guides Created
  const customGuides = AppState.getCustomGuides();
  const totalGuides = Object.keys(DEFAULT_SAMPLE_STUDY_GUIDES).length + Object.keys(customGuides).length;
  const guideCountEl = document.getElementById("stat-guide-count");
  if (guideCountEl) guideCountEl.textContent = totalGuides;

  // 3. Quiz Score
  const quizState = JSON.parse(localStorage.getItem(AppState.KEYS.QUIZ_STATE) || "{}");
  const quizScoreEl = document.getElementById("stat-quiz-score");
  if (quizScoreEl) {
    if (quizState.highestScore !== undefined) {
      quizScoreEl.textContent = `High Score: ${quizState.highestScore}/10 (${quizState.attempts || 1} attempt${(quizState.attempts || 1) > 1 ? 's' : ''})`;
    } else {
      quizScoreEl.textContent = "High-yield MCQs for OS exam";
    }
  }

  // Populate recent cards on dashboard
  renderDashboardRecentCards();
}

function renderDashboardRecentCards() {
  const container = document.getElementById("dashboard-recent-cards");
  if (!container) return;

  const customGuides = AppState.getCustomGuides();
  const allGuides = { ...DEFAULT_SAMPLE_STUDY_GUIDES, ...customGuides };
  const guideKeys = Object.keys(allGuides).slice(0, 4);

  let html = "";
  guideKeys.forEach(key => {
    const guide = allGuides[key];
    const previewDef = guide.definitions && guide.definitions[0] 
      ? guide.definitions[0].definition.substring(0, 110) + "..."
      : "High-yield lecture summary ready for exam revision.";

    html += `
      <div class="study-card-item" onclick="openStudyGuideTopic('${key}')">
        <div>
          <div class="card-top-row">
            <span class="chip chip-purple">${guide.tag || "Module"}</span>
            <span class="tag tag-accent">${guide.unit || "OS"}</span>
          </div>
          <h3 class="card-topic-title">${guide.title}</h3>
          <p class="card-snippet">${previewDef}</p>
        </div>
        <div class="card-meta-foot">
          <span>${guide.subject || "Operating Systems"}</span>
          <span style="color: var(--purple-primary); font-weight:700;">Open Guide &rarr;</span>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function openStudyGuideTopic(topicId) {
  navigateToSection("studyguide");
  const topicSelect = document.getElementById("guide-topic-select");
  if (topicSelect) {
    topicSelect.value = topicId;
    renderStudyGuideContent(topicId);
  }
}

// ==========================================================================
// 6. UPLOAD LECTURE NOTES LOGIC
// ==========================================================================

function initUploadSection() {
  const dropZone = document.getElementById("pdf-drop-zone");
  const fileInput = document.getElementById("pdf-file-input");
  const clearBtn = document.getElementById("btn-clear-files");
  const sampleBtn = document.getElementById("btn-load-sample-pdfs");

  if (!dropZone || !fileInput) return;

  // File input change
  fileInput.addEventListener("change", (e) => {
    handleFilesSelected(Array.from(e.target.files));
    fileInput.value = "";
  });

  // Drag and Drop
  ["dragenter", "dragover"].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropZone.classList.add("dragover");
    });
  });

  ["dragleave", "drop"].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropZone.classList.remove("dragover");
    });
  });

  dropZone.addEventListener("drop", (e) => {
    const dt = e.dataTransfer;
    const files = Array.from(dt.files).filter(f => f.name.toLowerCase().endsWith(".pdf"));
    if (files.length === 0) {
      showToast("Please drop valid PDF documents.", "warning");
      return;
    }
    handleFilesSelected(files);
  });

  // Clear all button
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      AppState.setUploadedDocs([]);
      renderFileList();
      showToast("All documents cleared from session.", "info");
    });
  }

  // Load sample PDFs button
  if (sampleBtn) {
    sampleBtn.addEventListener("click", () => {
      const sampleFiles = [
        { name: "CSE301_OS_Unit1_SystemStructures.pdf", size: 4823440, type: "application/pdf", date: "2026-10-24" },
        { name: "CSE301_OS_Unit2_CPU_Scheduling.pdf", size: 3145728, type: "application/pdf", date: "2026-10-24" },
        { name: "CSE301_OS_Unit3_Deadlocks_Synchronization.pdf", size: 5242880, type: "application/pdf", date: "2026-10-24" },
        { name: "CSE301_OS_Unit4_MemoryManagement_Paging.pdf", size: 6815744, type: "application/pdf", date: "2026-10-24" }
      ];
      AppState.setUploadedDocs(sampleFiles);
      renderFileList();
      showToast("4 Sample Operating Systems lecture PDFs loaded!", "success");
    });
  }

  renderFileList();
}

function handleFilesSelected(newFiles) {
  const currentDocs = AppState.getUploadedDocs();
  let addedCount = 0;

  newFiles.forEach(file => {
    const exists = currentDocs.some(d => d.name === file.name && d.size === file.size);
    if (!exists) {
      currentDocs.push({
        name: file.name,
        size: file.size,
        type: file.type || "application/pdf",
        date: new Date().toISOString().split("T")[0]
      });
      addedCount++;
    }
  });

  AppState.setUploadedDocs(currentDocs);
  renderFileList();

  if (addedCount > 0) {
    showToast(`Added ${addedCount} lecture document${addedCount > 1 ? "s" : ""}.`, "success");
  } else {
    showToast("File(s) already in list.", "info");
  }
}

function removeFile(index) {
  const currentDocs = AppState.getUploadedDocs();
  currentDocs.splice(index, 1);
  AppState.setUploadedDocs(currentDocs);
  renderFileList();
  showToast("File removed from session.", "info");
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function renderFileList() {
  const container = document.getElementById("file-list-container");
  const countLabel = document.getElementById("file-count-label");
  const clearBtn = document.getElementById("btn-clear-files");
  const statusIndicator = document.getElementById("upload-status-indicator");
  const statusText = document.getElementById("upload-status-text");

  if (!container) return;

  const docs = AppState.getUploadedDocs();
  if (countLabel) countLabel.textContent = docs.length;

  if (clearBtn) {
    clearBtn.disabled = docs.length === 0;
  }

  if (statusIndicator && statusText) {
    const dot = statusIndicator.querySelector(".status-indicator-dot");
    if (docs.length > 0) {
      if (dot) dot.className = "status-indicator-dot active";
      statusText.textContent = `${docs.length} PDF${docs.length > 1 ? "s" : ""} selected (Ready for NotebookLM)`;
    } else {
      if (dot) dot.className = "status-indicator-dot idle";
      statusText.textContent = "No files selected";
    }
  }

  if (docs.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        <p>No lecture PDFs added yet. Click browse or use sample documents.</p>
      </div>
    `;
    return;
  }

  let html = "";
  docs.forEach((doc, idx) => {
    html += `
      <div class="file-row-item">
        <div class="file-row-left">
          <span class="file-pdf-icon">&#128196;</span>
          <div>
            <div class="file-name">${escapeHtml(doc.name)}</div>
            <span class="file-size-badge">${formatBytes(doc.size)} &bull; ${doc.date}</span>
          </div>
        </div>
        <button type="button" class="file-remove-btn" onclick="removeFile(${idx})" title="Remove file">
          &times;
        </button>
      </div>
    `;
  });

  container.innerHTML = html;
}

// ==========================================================================
// 7. STUDY GUIDE PAGE
// ==========================================================================

function initStudyGuideSection() {
  const topicSelect = document.getElementById("guide-topic-select");
  const copyBtn = document.getElementById("btn-copy-studyguide");
  const downloadBtn = document.getElementById("btn-download-studyguide");
  const openModalBtn = document.getElementById("btn-open-create-guide-modal");

  // Load custom guides into dropdown
  refreshStudyGuideDropdown();

  if (topicSelect) {
    topicSelect.addEventListener("change", (e) => {
      renderStudyGuideContent(e.target.value);
    });
    // Initial render
    renderStudyGuideContent(topicSelect.value);
  }

  // Copy guide content
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const activeTopicId = topicSelect ? topicSelect.value : "os-structure";
      const guide = getGuideById(activeTopicId);
      if (!guide) return;

      const plainText = buildStudyGuidePlainText(guide);
      copyTextToClipboard(plainText, "Study Guide copied to clipboard!");
    });
  }

  // Download as TXT file
  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      const activeTopicId = topicSelect ? topicSelect.value : "os-structure";
      const guide = getGuideById(activeTopicId);
      if (!guide) return;

      const plainText = buildStudyGuidePlainText(guide);
      downloadAsTextFile(`${guide.id || "study_guide"}.txt`, plainText);
      showToast(`Downloaded ${guide.title} as TXT.`, "success");
    });
  }

  // Custom Guide Modal
  initCustomGuideModal();
}

function refreshStudyGuideDropdown() {
  const topicSelect = document.getElementById("guide-topic-select");
  if (!topicSelect) return;

  const customGuides = AppState.getCustomGuides();
  const currentVal = topicSelect.value;

  // Rebuild options
  let optionsHtml = `
    <option value="os-structure">1. Operating System Structure</option>
    <option value="process-scheduling">2. Process Scheduling</option>
    <option value="deadlock">3. Deadlock & Coffman Conditions</option>
    <option value="memory-management">4. Memory Management</option>
    <option value="paging">5. Paging & Segmentation</option>
  `;

  const customKeys = Object.keys(customGuides);
  if (customKeys.length > 0) {
    optionsHtml += `<optgroup label="Your Custom Study Guides">`;
    customKeys.forEach(k => {
      optionsHtml += `<option value="${k}">${escapeHtml(customGuides[k].title)}</option>`;
    });
    optionsHtml += `</optgroup>`;
  }

  topicSelect.innerHTML = optionsHtml;
  if (currentVal) topicSelect.value = currentVal;
}

function getGuideById(id) {
  if (DEFAULT_SAMPLE_STUDY_GUIDES[id]) {
    return DEFAULT_SAMPLE_STUDY_GUIDES[id];
  }
  const custom = AppState.getCustomGuides();
  return custom[id] || DEFAULT_SAMPLE_STUDY_GUIDES["os-structure"];
}

function renderStudyGuideContent(topicId) {
  const container = document.getElementById("studyguide-display-container");
  if (!container) return;

  const guide = getGuideById(topicId);
  if (!guide) return;

  // Build Definitions
  let defsHtml = "";
  if (guide.definitions && guide.definitions.length > 0) {
    guide.definitions.forEach(def => {
      defsHtml += `
        <div class="concept-definition-box">
          <strong>${escapeHtml(def.term)}:</strong>
          <p>${escapeHtml(def.definition)}</p>
        </div>
      `;
    });
  }

  // Build Key Points
  let pointsHtml = "";
  if (guide.keyPoints && guide.keyPoints.length > 0) {
    pointsHtml += `<ul class="key-points-list">`;
    guide.keyPoints.forEach(pt => {
      pointsHtml += `<li>${escapeHtml(pt)}</li>`;
    });
    pointsHtml += `</ul>`;
  }

  // Build Exam Prep
  let examPrepHtml = "";
  if (guide.examPrep) {
    examPrepHtml = `
      <div class="exam-prep-callout">
        <h4>&#127891; Exam Preparation & Viva Notes</h4>
        <p>${escapeHtml(guide.examPrep)}</p>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="guide-article-header">
      <div class="guide-badge-row">
        <span class="chip chip-purple">${escapeHtml(guide.subject || "Operating Systems")}</span>
        <span class="chip chip-cyan">${escapeHtml(guide.unit || "CSE Study Module")}</span>
        <span class="badge-pill-sample">Verified Sample Material</span>
      </div>
      <h2 class="guide-main-title">${escapeHtml(guide.title)}</h2>
      <p class="guide-lead-text">Structured revision material grounded in standard university CSE lecture slides.</p>
    </div>

    <div class="guide-section-block">
      <h3 class="guide-section-heading">
        <span>01.</span> Core Concepts & Formal Definitions
      </h3>
      ${defsHtml}
    </div>

    <div class="guide-section-block">
      <h3 class="guide-section-heading">
        <span>02.</span> Working Mechanisms & Important Principles
      </h3>
      ${pointsHtml}
    </div>

    <div class="guide-section-block">
      <h3 class="guide-section-heading">
        <span>03.</span> Examination Callouts & Frequently Tested Concepts
      </h3>
      ${examPrepHtml}
    </div>
  `;
}

function buildStudyGuidePlainText(guide) {
  let text = `===================================================================\n`;
  text += `SMART STUDY ASSISTANT - EXAM STUDY GUIDE\n`;
  text += `Title: ${guide.title}\n`;
  text += `Subject: ${guide.subject || "Operating Systems"}\n`;
  text += `Unit: ${guide.unit || "Module"}\n`;
  text += `===================================================================\n\n`;

  text += `1. CORE DEFINITIONS:\n`;
  if (guide.definitions) {
    guide.definitions.forEach(d => {
      text += `* ${d.term}: ${d.definition}\n\n`;
    });
  }

  text += `\n2. KEY POINTS & ALGORITHMS:\n`;
  if (guide.keyPoints) {
    guide.keyPoints.forEach(pt => {
      text += `* ${pt}\n`;
    });
  }

  text += `\n3. EXAM PREPARATION TIPS:\n`;
  text += `${guide.examPrep || "Review textbook problems and practice Gantt charts."}\n\n`;
  text += `Generated with Smart Study Assistant (Capstone 41) & Google NotebookLM.\n`;

  return text;
}

function downloadAsTextFile(filename, text) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function initCustomGuideModal() {
  const modal = document.getElementById("modal-create-guide");
  const openBtn = document.getElementById("btn-open-create-guide-modal");
  const closeBtn = document.getElementById("btn-close-modal-guide");
  const cancelBtn = document.getElementById("btn-cancel-modal-guide");
  const form = document.getElementById("custom-guide-form");

  if (!modal) return;

  const closeModal = () => modal.classList.add("hidden");
  const openModal = () => modal.classList.remove("hidden");

  if (openBtn) openBtn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (cancelBtn) cancelBtn.addEventListener("click", closeModal);

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("custom-guide-title").value.trim();
      const subject = document.getElementById("custom-guide-subject").value.trim();
      const unit = document.getElementById("custom-guide-topic").value.trim();
      const defsRaw = document.getElementById("custom-guide-definitions").value.trim();
      const keyPointsRaw = document.getElementById("custom-guide-keypoints").value.trim();
      const examPrep = document.getElementById("custom-guide-examprep").value.trim();

      if (!title) return;

      const id = "custom-" + Date.now();
      const definitions = defsRaw ? [
        { term: "Key Concepts", definition: defsRaw }
      ] : [];

      const keyPoints = keyPointsRaw ? keyPointsRaw.split("\n").filter(l => l.trim().length > 0) : [];

      const newGuide = {
        id,
        title,
        subject,
        unit,
        tag: "Custom Guide",
        definitions,
        keyPoints,
        examPrep
      };

      AppState.saveCustomGuide(newGuide);
      refreshStudyGuideDropdown();

      const topicSelect = document.getElementById("guide-topic-select");
      if (topicSelect) {
        topicSelect.value = id;
        renderStudyGuideContent(id);
      }

      form.reset();
      closeModal();
      showToast("Custom study guide saved!", "success");
    });
  }
}

// ==========================================================================
// 8. AI SUMMARY PAGE
// ==========================================================================

function initSummarySection() {
  const subjectInput = document.getElementById("summary-subject");
  const topicInput = document.getElementById("summary-topic");
  const rawNotesInput = document.getElementById("summary-raw-notes");
  const radioButtons = document.querySelectorAll("input[name='summary-length']");
  const promptBox = document.getElementById("generated-prompt-text");
  const copyPromptBtn = document.getElementById("btn-copy-gen-prompt");
  const loadSampleBtn = document.getElementById("btn-load-sample-summary");
  const clearBtn = document.getElementById("btn-clear-summary-inputs");
  const displayBox = document.getElementById("summary-display-box");
  const copySummaryBtn = document.getElementById("btn-copy-summary");
  const saveSummaryBtn = document.getElementById("btn-save-summary");

  function updateGeneratedPrompt() {
    if (!promptBox) return;
    const subject = subjectInput ? subjectInput.value.trim() : "Operating Systems";
    const topic = topicInput ? topicInput.value.trim() : "Process Scheduling";
    let length = "Short";
    radioButtons.forEach(r => { if (r.checked) length = r.value; });

    let prompt = `You are an expert college professor in ${subject}.\n`;
    prompt += `Analyze the uploaded lecture materials regarding "${topic}".\n`;
    prompt += `Generate a ${length.toUpperCase()} summary strictly grounded in the PDF slides:\n`;

    if (length === "Short") {
      prompt += `- Provide an executive overview in 3 concise bullet points.\n- Highlight 3 essential exam terms with definitions.\n- List 1 primary algorithm formula or working step.`;
    } else if (length === "Medium") {
      prompt += `- Detailed conceptual breakdown of "${topic}".\n- Working mechanism, pros vs cons, and architecture trade-offs.\n- 5 key points with inline slide citation references.`;
    } else {
      prompt += `- In-depth academic synthesis covering history, architectural motivation, step-by-step algorithms, pseudo-code analysis, and potential exam viva pitfalls.\n- Ensure all claims cite uploaded source numbers.`;
    }

    promptBox.textContent = prompt;
  }

  // Bind inputs to dynamic prompt updating
  if (subjectInput) subjectInput.addEventListener("input", updateGeneratedPrompt);
  if (topicInput) topicInput.addEventListener("input", updateGeneratedPrompt);
  radioButtons.forEach(r => r.addEventListener("change", updateGeneratedPrompt));

  updateGeneratedPrompt();

  // Copy generated prompt
  if (copyPromptBtn && promptBox) {
    copyPromptBtn.addEventListener("click", () => {
      copyTextToClipboard(promptBox.textContent, "NotebookLM prompt copied to clipboard!");
    });
  }

  // Load sample summary
  if (loadSampleBtn && displayBox) {
    loadSampleBtn.addEventListener("click", () => {
      const sample = SAMPLE_SUMMARIES["Process Synchronization & Critical Section"];
      if (sample) {
        displayBox.innerText = sample.content;
        if (subjectInput) subjectInput.value = sample.subject;
        if (topicInput) topicInput.value = sample.topic;
        updateGeneratedPrompt();
        showToast("Realistic Operating Systems sample summary loaded!", "success");
      }
    });
  }

  // Clear inputs
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (rawNotesInput) rawNotesInput.value = "";
      if (displayBox) displayBox.innerText = "";
      showToast("Cleared summary workspace.", "info");
    });
  }

  // Copy summary
  if (copySummaryBtn && displayBox) {
    copySummaryBtn.addEventListener("click", () => {
      const text = displayBox.innerText.trim();
      if (!text) {
        showToast("No summary content to copy.", "warning");
        return;
      }
      copyTextToClipboard(text, "Summary copied to clipboard!");
    });
  }

  // Save summary to localStorage
  if (saveSummaryBtn && displayBox) {
    saveSummaryBtn.addEventListener("click", () => {
      const text = displayBox.innerText.trim();
      if (!text) {
        showToast("Cannot save empty summary.", "warning");
        return;
      }
      const subject = subjectInput ? subjectInput.value.trim() : "Operating Systems";
      const topic = topicInput ? topicInput.value.trim() : "Lecture Notes";
      let length = "Custom";
      radioButtons.forEach(r => { if (r.checked) length = r.value; });

      AppState.saveSummary({
        subject,
        topic,
        length,
        content: text,
        date: new Date().toISOString().split("T")[0]
      });

      renderSavedSummariesList();
      showToast(`Saved summary for "${topic}"!`, "success");
    });
  }

  // Initial load
  if (displayBox) {
    const sample = SAMPLE_SUMMARIES["Process Synchronization & Critical Section"];
    displayBox.innerText = sample.content;
  }

  renderSavedSummariesList();
}

function renderSavedSummariesList() {
  const container = document.getElementById("saved-summaries-container");
  const countEl = document.getElementById("saved-summary-count");
  if (!container) return;

  const summaries = AppState.getSavedSummaries();
  const keys = Object.keys(summaries);
  if (countEl) countEl.textContent = keys.length;

  if (keys.length === 0) {
    container.innerHTML = `<p class="empty-state">No saved summaries yet.</p>`;
    return;
  }

  let html = "";
  keys.forEach(k => {
    const item = summaries[k];
    html += `
      <div class="saved-summary-item" onclick="loadSavedSummary('${escapeHtml(k)}')">
        <div>
          <strong>${escapeHtml(item.topic || k)}</strong>
          <span style="display:block; font-size:0.75rem; color:var(--navy-muted);">${escapeHtml(item.subject)} &bull; ${item.length || "Standard"}</span>
        </div>
        <span class="tag tag-accent">&rarr; Load</span>
      </div>
    `;
  });

  container.innerHTML = html;
}

function loadSavedSummary(key) {
  const summaries = AppState.getSavedSummaries();
  const item = summaries[key];
  if (!item) return;

  const displayBox = document.getElementById("summary-display-box");
  const subjectInput = document.getElementById("summary-subject");
  const topicInput = document.getElementById("summary-topic");

  if (displayBox) displayBox.innerText = item.content;
  if (subjectInput) subjectInput.value = item.subject;
  if (topicInput) topicInput.value = item.topic;

  showToast(`Loaded summary for ${item.topic}!`, "info");
}

// ==========================================================================
// 9. QUIZ PAGE (10 MCQs)
// ==========================================================================

let currentQuizIndex = 0;
let quizScore = 0;
let userAnswers = {}; // { questionId: selectedOptionIndex }

function initQuizSection() {
  const submitBtn = document.getElementById("btn-submit-answer");
  const nextBtn = document.getElementById("btn-next-question");
  const restartBtn = document.getElementById("btn-restart-quiz");
  const retakeFinishBtn = document.getElementById("btn-retake-quiz-finish");

  if (submitBtn) {
    submitBtn.addEventListener("click", handleQuizSubmitAnswer);
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", handleQuizNextQuestion);
  }

  if (restartBtn) {
    restartBtn.addEventListener("click", resetQuiz);
  }

  if (retakeFinishBtn) {
    retakeFinishBtn.addEventListener("click", resetQuiz);
  }

  loadQuizQuestion(currentQuizIndex);
}

function loadQuizQuestion(index) {
  const question = SAMPLE_QUIZ_QUESTIONS[index];
  if (!question) return;

  // Update HUD
  const progressBar = document.getElementById("quiz-progress-bar");
  const progressText = document.getElementById("quiz-progress-text");
  const scoreDisplay = document.getElementById("quiz-current-score");

  const progressPercent = ((index + 1) / SAMPLE_QUIZ_QUESTIONS.length) * 100;
  if (progressBar) progressBar.style.width = `${progressPercent}%`;
  if (progressText) progressText.textContent = `Question ${index + 1} of ${SAMPLE_QUIZ_QUESTIONS.length}`;
  if (scoreDisplay) scoreDisplay.textContent = quizScore;

  // Update Question Content
  const categoryEl = document.getElementById("quiz-question-category");
  const qnumEl = document.getElementById("quiz-question-number");
  const titleEl = document.getElementById("quiz-question-title");
  const optionsContainer = document.getElementById("quiz-options-container");
  const explanationContainer = document.getElementById("quiz-explanation-container");
  const submitBtn = document.getElementById("btn-submit-answer");
  const nextBtn = document.getElementById("btn-next-question");

  if (categoryEl) categoryEl.textContent = question.category;
  if (qnumEl) qnumEl.textContent = `Question ${index + 1} of ${SAMPLE_QUIZ_QUESTIONS.length}`;
  if (titleEl) titleEl.textContent = question.question;

  // Reset controls
  if (explanationContainer) explanationContainer.classList.add("hidden");
  if (submitBtn) {
    submitBtn.classList.remove("hidden");
    submitBtn.disabled = true;
  }
  if (nextBtn) nextBtn.classList.add("hidden");

  // Render 4 Options
  if (optionsContainer) {
    let html = "";
    const prefixes = ["A", "B", "C", "D"];
    question.options.forEach((opt, optIdx) => {
      html += `
        <button type="button" class="quiz-option-btn" data-index="${optIdx}" onclick="handleOptionSelect(${optIdx})">
          <span class="option-prefix">${prefixes[optIdx]}</span>
          <span class="option-text">${escapeHtml(opt)}</span>
        </button>
      `;
    });
    optionsContainer.innerHTML = html;
  }
}

function handleOptionSelect(optionIdx) {
  const submitBtn = document.getElementById("btn-submit-answer");
  // Don't allow changing if already submitted
  if (submitBtn && submitBtn.classList.contains("hidden")) return;

  const optionButtons = document.querySelectorAll(".quiz-option-btn");
  optionButtons.forEach(btn => {
    if (parseInt(btn.dataset.index) === optionIdx) {
      btn.classList.add("selected");
    } else {
      btn.classList.remove("selected");
    }
  });

  if (submitBtn) submitBtn.disabled = false;
}

function handleQuizSubmitAnswer() {
  const selectedBtn = document.querySelector(".quiz-option-btn.selected");
  if (!selectedBtn) return;

  const selectedIdx = parseInt(selectedBtn.dataset.index);
  const currentQ = SAMPLE_QUIZ_QUESTIONS[currentQuizIndex];
  const isCorrect = selectedIdx === currentQ.correctAnswer;

  if (isCorrect) {
    quizScore++;
  }

  // Store answer
  userAnswers[currentQ.id] = selectedIdx;

  // Style buttons
  const optionButtons = document.querySelectorAll(".quiz-option-btn");
  optionButtons.forEach(btn => {
    btn.disabled = true;
    const idx = parseInt(btn.dataset.index);
    if (idx === currentQ.correctAnswer) {
      btn.classList.add("correct");
    } else if (idx === selectedIdx && !isCorrect) {
      btn.classList.add("incorrect");
    }
  });

  // Show explanation
  const explanationContainer = document.getElementById("quiz-explanation-container");
  const explanationIcon = document.getElementById("explanation-icon");
  const explanationTitle = document.getElementById("explanation-title");
  const explanationText = document.getElementById("explanation-text");

  if (explanationContainer) {
    explanationContainer.classList.remove("hidden");
    if (isCorrect) {
      explanationIcon.textContent = "✔";
      explanationIcon.style.color = "var(--success)";
      explanationTitle.textContent = "Correct Answer!";
      explanationTitle.style.color = "var(--success)";
    } else {
      explanationIcon.textContent = "✖";
      explanationIcon.style.color = "var(--danger)";
      explanationTitle.textContent = "Incorrect";
      explanationTitle.style.color = "var(--danger)";
    }
    explanationText.textContent = currentQ.explanation;
  }

  // Update Score HUD
  const scoreDisplay = document.getElementById("quiz-current-score");
  if (scoreDisplay) scoreDisplay.textContent = quizScore;

  // Toggle buttons
  const submitBtn = document.getElementById("btn-submit-answer");
  const nextBtn = document.getElementById("btn-next-question");
  if (submitBtn) submitBtn.classList.add("hidden");
  if (nextBtn) {
    nextBtn.classList.remove("hidden");
    if (currentQuizIndex === SAMPLE_QUIZ_QUESTIONS.length - 1) {
      nextBtn.textContent = "View Final Results &rarr;";
    } else {
      nextBtn.textContent = "Next Question &rarr;";
    }
  }
}

function handleQuizNextQuestion() {
  if (currentQuizIndex < SAMPLE_QUIZ_QUESTIONS.length - 1) {
    currentQuizIndex++;
    loadQuizQuestion(currentQuizIndex);
  } else {
    showQuizResults();
  }
}

function showQuizResults() {
  const activeCard = document.getElementById("quiz-active-card");
  const resultsCard = document.getElementById("quiz-results-container");
  const finalScoreVal = document.getElementById("final-score-value");
  const feedbackEl = document.getElementById("final-score-feedback");

  if (activeCard) activeCard.classList.add("hidden");
  if (resultsCard) resultsCard.classList.remove("hidden");

  if (finalScoreVal) finalScoreVal.textContent = quizScore;

  // Persist high score
  const prevState = JSON.parse(localStorage.getItem(AppState.KEYS.QUIZ_STATE) || "{}");
  const attempts = (prevState.attempts || 0) + 1;
  const highest = Math.max(quizScore, prevState.highestScore || 0);
  localStorage.setItem(AppState.KEYS.QUIZ_STATE, JSON.stringify({
    highestScore: highest,
    attempts,
    lastScore: quizScore,
    date: new Date().toISOString()
  }));

  updateDashboardMetrics();

  // Feedback message
  let feedback = "";
  if (quizScore === 10) {
    feedback = "Outstanding! Perfect 10/10. You have demonstrated comprehensive mastery over Operating Systems core concepts!";
  } else if (quizScore >= 7) {
    feedback = "Great work! You scored " + quizScore + "/10. You have a solid grasp of OS principles. Review the few missed topics in the Study Guides.";
  } else if (quizScore >= 5) {
    feedback = "Good effort! Score: " + quizScore + "/10. Revisit Process Scheduling Gantt charts and Deadlock Coffman conditions for better retention.";
  } else {
    feedback = "Keep practicing! Score: " + quizScore + "/10. Take advantage of our Study Guides and Prompt Library to reinforce foundational concepts.";
  }

  if (feedbackEl) feedbackEl.textContent = feedback;
}

function resetQuiz() {
  currentQuizIndex = 0;
  quizScore = 0;
  userAnswers = {};

  const activeCard = document.getElementById("quiz-active-card");
  const resultsCard = document.getElementById("quiz-results-container");

  if (activeCard) activeCard.classList.remove("hidden");
  if (resultsCard) resultsCard.classList.add("hidden");

  loadQuizQuestion(0);
  showToast("Quiz restarted.", "info");
}

// ==========================================================================
// 10. FAQ SECTION
// ==========================================================================

function initFAQSection() {
  const searchInput = document.getElementById("faq-search-input");
  const clearSearchBtn = document.getElementById("faq-clear-search");
  const expandAllBtn = document.getElementById("btn-expand-all-faqs");
  const addFaqBtn = document.getElementById("btn-add-custom-faq");

  renderFAQList();

  // Search logic
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (clearSearchBtn) clearSearchBtn.style.display = q ? "block" : "none";
      renderFAQList(q);
    });
  }

  if (clearSearchBtn && searchInput) {
    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      clearSearchBtn.style.display = "none";
      renderFAQList();
    });
  }

  // Expand / collapse all toggle
  if (expandAllBtn) {
    let allExpanded = false;
    expandAllBtn.addEventListener("click", () => {
      const faqItems = document.querySelectorAll(".faq-item");
      allExpanded = !allExpanded;
      faqItems.forEach(item => {
        if (allExpanded) item.classList.add("open");
        else item.classList.remove("open");
      });
      expandAllBtn.textContent = allExpanded ? "Collapse All" : "Expand All";
    });
  }

  // Add custom FAQ
  if (addFaqBtn) {
    addFaqBtn.addEventListener("click", () => {
      const qInput = document.getElementById("custom-faq-question");
      const cInput = document.getElementById("custom-faq-category");
      const aInput = document.getElementById("custom-faq-answer");

      const question = qInput ? qInput.value.trim() : "";
      const category = cInput ? cInput.value.trim() : "Operating Systems";
      const answer = aInput ? aInput.value.trim() : "";

      if (!question || !answer) {
        showToast("Please provide both question and answer.", "warning");
        return;
      }

      AppState.saveFAQ({
        id: "faq-custom-" + Date.now(),
        question,
        category: category || "General OS",
        answer
      });

      if (qInput) qInput.value = "";
      if (cInput) cInput.value = "";
      if (aInput) aInput.value = "";

      renderFAQList();
      showToast("Custom viva question added to FAQ list!", "success");
    });
  }
}

function renderFAQList(filterQuery = "") {
  const container = document.getElementById("faq-list");
  const countDisplay = document.getElementById("faq-count-display");
  if (!container) return;

  const allFaqs = AppState.getFAQs();
  const filtered = allFaqs.filter(f => {
    if (!filterQuery) return true;
    return f.question.toLowerCase().includes(filterQuery) ||
           f.answer.toLowerCase().includes(filterQuery) ||
           f.category.toLowerCase().includes(filterQuery);
  });

  if (countDisplay) countDisplay.textContent = filtered.length;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>No questions matched your search query "${escapeHtml(filterQuery)}".</p>
      </div>
    `;
    return;
  }

  let html = "";
  filtered.forEach(faq => {
    html += `
      <div class="faq-item" id="${faq.id}">
        <button type="button" class="faq-header-btn" onclick="toggleFAQ('${faq.id}')">
          <div class="faq-question-title">
            <span class="faq-category-tag">${escapeHtml(faq.category)}</span>
            <span>${escapeHtml(faq.question)}</span>
          </div>
          <svg class="faq-icon-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
        <div class="faq-body-content">
          <p>${escapeHtml(faq.answer)}</p>
          <div class="faq-footer-bar">
            <button class="btn btn-xs btn-outline" onclick="copyFAQText('${escapeHtml(faq.question)}', '${escapeHtml(faq.answer)}')">
              Copy Q&A
            </button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function toggleFAQ(faqId) {
  const item = document.getElementById(faqId);
  if (item) {
    item.classList.toggle("open");
  }
}

function copyFAQText(question, answer) {
  const text = `Q: ${question}\nA: ${answer}\n(Source: Smart Study Assistant CSE OS FAQs)`;
  copyTextToClipboard(text, "FAQ copied to clipboard!");
}

// ==========================================================================
// 11. AUDIO OVERVIEW PLAYER
// ==========================================================================

let audioContext = null;
let sampleAudioBlobUrl = null;

function initAudioSection() {
  const audioEl = document.getElementById("main-audio-element");
  const playPauseBtn = document.getElementById("btn-audio-play-pause");
  const playIcon = document.getElementById("play-icon");
  const pauseIcon = document.getElementById("pause-icon");
  const disc = document.getElementById("audio-art-disc");
  const visualizer = document.getElementById("audio-visualizer");
  const seekSlider = document.getElementById("audio-seek-slider");
  const currentTimeEl = document.getElementById("audio-current-time");
  const durationTimeEl = document.getElementById("audio-duration-time");
  const rewindBtn = document.getElementById("btn-audio-rewind");
  const forwardBtn = document.getElementById("btn-audio-forward");
  const volumeSlider = document.getElementById("audio-volume-slider");
  const volumePct = document.getElementById("audio-volume-pct");
  const fileInput = document.getElementById("local-audio-file-input");
  const generateSynthBtn = document.getElementById("btn-generate-synthesized-audio");
  const trackFilename = document.getElementById("audio-track-filename");
  const trackDesc = document.getElementById("audio-track-desc");
  const trackSourceBadge = document.getElementById("audio-source-badge");

  if (!audioEl) return;

  // Generate initial synth audio so player is 100% functional out of the box
  createSynthesizedAudioBlob().then(url => {
    sampleAudioBlobUrl = url;
    audioEl.src = sampleAudioBlobUrl;
  });

  // Play / Pause toggle
  if (playPauseBtn) {
    playPauseBtn.addEventListener("click", () => {
      if (audioEl.paused) {
        audioEl.play().then(() => {
          updateAudioPlayUI(true);
        }).catch(err => {
          console.warn("Audio playback error: ", err);
          showToast("Click 'Generate Realistic Audio' to initialize audio playback.", "info");
        });
      } else {
        audioEl.pause();
        updateAudioPlayUI(false);
      }
    });
  }

  function updateAudioPlayUI(isPlaying) {
    if (playIcon) playIcon.classList.toggle("hidden", isPlaying);
    if (pauseIcon) pauseIcon.classList.toggle("hidden", !isPlaying);
    if (disc) disc.classList.toggle("playing", isPlaying);
    if (visualizer) visualizer.classList.toggle("animating", isPlaying);
  }

  // Time update
  audioEl.addEventListener("timeupdate", () => {
    if (!audioEl.duration) return;
    const progress = (audioEl.currentTime / audioEl.duration) * 100;
    if (seekSlider) seekSlider.value = progress;
    if (currentTimeEl) currentTimeEl.textContent = formatAudioTime(audioEl.currentTime);
  });

  // Loaded metadata
  audioEl.addEventListener("loadedmetadata", () => {
    if (durationTimeEl) durationTimeEl.textContent = formatAudioTime(audioEl.duration);
  });

  // Ended
  audioEl.addEventListener("ended", () => {
    updateAudioPlayUI(false);
    if (seekSlider) seekSlider.value = 0;
  });

  // Seek Scrubber
  if (seekSlider) {
    seekSlider.addEventListener("input", (e) => {
      if (!audioEl.duration) return;
      const targetTime = (e.target.value / 100) * audioEl.duration;
      audioEl.currentTime = targetTime;
    });
  }

  // Rewind / Fast Forward
  if (rewindBtn) {
    rewindBtn.addEventListener("click", () => {
      audioEl.currentTime = Math.max(0, audioEl.currentTime - 10);
    });
  }

  if (forwardBtn) {
    forwardBtn.addEventListener("click", () => {
      if (audioEl.duration) {
        audioEl.currentTime = Math.min(audioEl.duration, audioEl.currentTime + 10);
      }
    });
  }

  // Volume
  if (volumeSlider) {
    volumeSlider.addEventListener("input", (e) => {
      const val = parseFloat(e.target.value);
      audioEl.volume = val;
      if (volumePct) volumePct.textContent = `${Math.round(val * 100)}%`;
    });
  }

  // Local File Input (.mp3, .wav)
  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const fileUrl = URL.createObjectURL(file);
      audioEl.src = fileUrl;
      audioEl.load();

      if (trackFilename) trackFilename.textContent = file.name;
      if (trackDesc) trackDesc.textContent = `User Local Audio File (${formatBytes(file.size)})`;
      if (trackSourceBadge) {
        trackSourceBadge.textContent = "Local Audio File Loaded";
        trackSourceBadge.className = "chip chip-cyan";
      }

      showToast(`Loaded ${file.name} into Audio Player!`, "success");
    });
  }

  // Synthesized Audio Generator button
  if (generateSynthBtn) {
    generateSynthBtn.addEventListener("click", () => {
      createSynthesizedAudioBlob().then(url => {
        audioEl.src = url;
        audioEl.load();
        if (trackFilename) trackFilename.textContent = "OS_Lecture_Synthesized_Demo.wav";
        if (trackDesc) trackDesc.textContent = "Synthesized Melodic Audio Overview Chime";
        if (trackSourceBadge) {
          trackSourceBadge.textContent = "Built-in Synthesized Preview";
          trackSourceBadge.className = "chip chip-purple";
        }
        showToast("Synthesized audio sequence generated! Click Play to listen.", "success");
      });
    });
  }
}

function formatAudioTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// Generate realistic synthesized audio wav using Web Audio API
async function createSynthesizedAudioBlob() {
  const sampleRate = 44100;
  const durationSeconds = 12; // 12 seconds preview tone sequence
  const numSamples = sampleRate * durationSeconds;

  const offlineCtx = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, numSamples, sampleRate);

  // Play a pleasant ambient study chord progression (C - G - Am - F)
  const notes = [
    { freq: 261.63, start: 0, dur: 3 }, // C4
    { freq: 329.63, start: 0, dur: 3 }, // E4
    { freq: 392.00, start: 0, dur: 3 }, // G4

    { freq: 196.00, start: 3, dur: 3 }, // G3
    { freq: 293.66, start: 3, dur: 3 }, // D4
    { freq: 392.00, start: 3, dur: 3 }, // G4

    { freq: 220.00, start: 6, dur: 3 }, // A3
    { freq: 261.63, start: 6, dur: 3 }, // C4
    { freq: 329.63, start: 6, dur: 3 }, // E4

    { freq: 174.61, start: 9, dur: 3 }, // F3
    { freq: 261.63, start: 9, dur: 3 }, // C4
    { freq: 349.23, start: 9, dur: 3 }  // F4
  ];

  notes.forEach(n => {
    const osc = offlineCtx.createOscillator();
    const gain = offlineCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(n.freq, n.start);

    gain.gain.setValueAtTime(0, n.start);
    gain.gain.linearRampToValueAtTime(0.12, n.start + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, n.start + n.dur);

    osc.connect(gain);
    gain.connect(offlineCtx.destination);

    osc.start(n.start);
    osc.stop(n.start + n.dur);
  });

  const renderedBuffer = await offlineCtx.startRendering();
  return audioBufferToWavBlob(renderedBuffer);
}

// Convert AudioBuffer to WAV Blob
function audioBufferToWavBlob(buffer) {
  const numChannels = 1;
  const sampleRate = buffer.sampleRate;
  const format = 1; // PCM
  const bitDepth = 16;
  const bytesPerSample = bitDepth / 8;
  const blockAlign = numChannels * bytesPerSample;

  const data = buffer.getChannelData(0);
  const dataLength = data.length * bytesPerSample;
  const bufferLength = 44 + dataLength;

  const arrayBuffer = new ArrayBuffer(bufferLength);
  const view = new DataView(arrayBuffer);

  function writeString(offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  writeString(0, "RIFF");
  view.setUint32(4, 36 + dataLength, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, format, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);
  writeString(36, "data");
  view.setUint32(40, dataLength, true);

  // PCM samples
  let offset = 44;
  for (let i = 0; i < data.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, data[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }

  const blob = new Blob([arrayBuffer], { type: "audio/wav" });
  return URL.createObjectURL(blob);
}

// ==========================================================================
// 12. STUDY TIMELINE
// ==========================================================================

function initTimelineSection() {
  renderTimelineMilestones();
}

function renderTimelineMilestones() {
  const container = document.getElementById("timeline-milestones-container");
  const countBadge = document.getElementById("timeline-mastery-count");
  if (!container) return;

  const timeline = AppState.getTimeline();
  const masteredCount = timeline.filter(t => t.mastered).length;
  if (countBadge) {
    countBadge.textContent = `${masteredCount} of ${timeline.length} Topics Mastered`;
  }

  let html = "";
  timeline.forEach((item, idx) => {
    const tagsHtml = item.tags.map(t => `<span class="topic-pill">${escapeHtml(t)}</span>`).join("");
    const isMastered = item.mastered;

    html += `
      <div class="timeline-milestone ${isMastered ? "mastered" : ""}">
        <div class="milestone-node">${isMastered ? "&#10004;" : item.step}</div>
        <div class="milestone-card">
          <div class="milestone-top-row">
            <span class="chip ${isMastered ? "chip-purple" : "chip-cyan"}">Milestone ${item.step}</span>
            <span style="font-size:0.75rem; color:var(--navy-muted); font-weight:600;">Sequential Path</span>
          </div>
          <h3 class="milestone-title">${escapeHtml(item.title)}</h3>
          <p class="milestone-desc">${escapeHtml(item.desc)}</p>
          <div class="milestone-topics-list">
            ${tagsHtml}
          </div>
          <div class="milestone-footer">
            <button class="status-toggle-btn ${isMastered ? "mastered" : ""}" onclick="toggleTimelineMastery('${item.id}')">
              <span>${isMastered ? "✓ Mastered" : "○ Mark as Mastered"}</span>
            </button>
            <button class="btn btn-xs btn-outline" onclick="openStudyGuideTopic('${getGuideIdForTimeline(item.id)}')">
              Open Revision Guide &rarr;
            </button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function toggleTimelineMastery(id) {
  const timeline = AppState.getTimeline();
  const item = timeline.find(t => t.id === id);
  if (item) {
    item.mastered = !item.mastered;
    AppState.saveTimeline(timeline);
    renderTimelineMilestones();
    showToast(item.mastered ? `Mastered: ${item.title}` : `Marked incomplete: ${item.title}`, "info");
  }
}

function getGuideIdForTimeline(timelineId) {
  const map = {
    "t1": "os-structure",
    "t2": "process-scheduling",
    "t3": "process-scheduling",
    "t4": "deadlock",
    "t5": "memory-management",
    "t6": "paging"
  };
  return map[timelineId] || "os-structure";
}

// ==========================================================================
// 13. ACCURACY VERIFICATION PAGE
// ==========================================================================

function initAccuracySection() {
  const container = document.getElementById("verification-checklist-container");
  const saveBtn = document.getElementById("btn-save-verification");
  const resetBtn = document.getElementById("btn-reset-verification");
  const notesTextarea = document.getElementById("verification-notes");

  // Load saved notes
  if (notesTextarea) {
    const savedNotes = localStorage.getItem(AppState.KEYS.VERIFICATION_NOTES);
    if (savedNotes) notesTextarea.value = savedNotes;

    notesTextarea.addEventListener("input", (e) => {
      localStorage.setItem(AppState.KEYS.VERIFICATION_NOTES, e.target.value);
    });
  }

  renderChecklist();
  renderSavedAudits();

  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const topicInput = document.getElementById("audit-topic-name");
      const verifierInput = document.getElementById("audit-verifier-name");
      const notes = notesTextarea ? notesTextarea.value.trim() : "";

      const topic = topicInput ? topicInput.value.trim() : "Operating Systems Topic";
      const verifier = verifierInput ? verifierInput.value.trim() : "Student Auditor";

      const checks = AppState.getVerificationChecks();
      const count = Object.values(checks).filter(Boolean).length;
      const status = count === 8 ? "Fully Verified (8/8)" : `${count}/8 Checks Passed`;

      const audit = {
        id: "audit-" + Date.now(),
        date: new Date().toISOString().split("T")[0],
        topic,
        verifier: verifier || "Student Reviewer",
        status,
        notes: notes || "Checklist completed according to lecture PDF sources."
      };

      AppState.saveVerificationAudit(audit);
      renderSavedAudits();
      showToast("Verification audit record saved!", "success");
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      AppState.saveVerificationChecks({});
      renderChecklist();
      showToast("Checklist reset.", "info");
    });
  }
}

function renderChecklist() {
  const container = document.getElementById("verification-checklist-container");
  const progressFill = document.getElementById("verification-progress-fill");
  const progressText = document.getElementById("checklist-progress-text");
  const statusPill = document.getElementById("verification-status-pill");

  if (!container) return;

  const checks = AppState.getVerificationChecks();
  let verifiedCount = 0;

  let html = "";
  VERIFICATION_CHECKLIST_TEMPLATE.forEach(item => {
    const isChecked = !!checks[item.id];
    if (isChecked) verifiedCount++;

    html += `
      <label class="check-item" for="check-${item.id}">
        <input type="checkbox" id="check-${item.id}" ${isChecked ? "checked" : ""} onchange="handleCheckChange('${item.id}', this.checked)">
        <div>
          <span class="check-label">${escapeHtml(item.label)}</span>
          <span class="check-hint">${escapeHtml(item.hint)}</span>
        </div>
      </label>
    `;
  });

  container.innerHTML = html;

  const pct = Math.round((verifiedCount / VERIFICATION_CHECKLIST_TEMPLATE.length) * 100);
  if (progressFill) progressFill.style.width = `${pct}%`;
  if (progressText) progressText.textContent = `${verifiedCount} / ${VERIFICATION_CHECKLIST_TEMPLATE.length} Verified (${pct}%)`;

  if (statusPill) {
    if (verifiedCount === 8) {
      statusPill.textContent = "Fully Verified (8/8)";
      statusPill.className = "badge-status-verified";
    } else if (verifiedCount > 0) {
      statusPill.textContent = `Partially Verified (${verifiedCount}/8)`;
      statusPill.className = "badge-status-unverified";
    } else {
      statusPill.textContent = "Pending Verification";
      statusPill.className = "badge-status-unverified";
    }
  }
}

function handleCheckChange(id, isChecked) {
  const checks = AppState.getVerificationChecks();
  checks[id] = isChecked;
  AppState.saveVerificationChecks(checks);
  renderChecklist();
}

function renderSavedAudits() {
  const container = document.getElementById("saved-audits-list");
  if (!container) return;

  const audits = AppState.getVerificationAudits();
  if (audits.length === 0) {
    container.innerHTML = `<p class="empty-state">No audits saved yet.</p>`;
    return;
  }

  let html = "";
  audits.forEach(audit => {
    html += `
      <div class="saved-audit-row">
        <div>
          <strong>${escapeHtml(audit.topic)}</strong>
          <span style="display:block; font-size:0.75rem; color:var(--navy-muted);">${audit.date} &bull; Auditor: ${escapeHtml(audit.verifier)}</span>
        </div>
        <span class="chip ${audit.status.includes('Fully') ? 'chip-cyan' : 'chip-purple'}">${audit.status}</span>
      </div>
    `;
  });

  container.innerHTML = html;
}

// ==========================================================================
// 14. PROMPT LIBRARY
// ==========================================================================

function initPromptLibrary() {
  const container = document.getElementById("prompt-library-cards");
  const filterButtons = document.querySelectorAll(".chip-filter");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.cat;
      renderPromptCards(cat);
    });
  });

  renderPromptCards("all");
}

function renderPromptCards(category = "all") {
  const container = document.getElementById("prompt-library-cards");
  if (!container) return;

  const filtered = PROMPTS_DATABASE.filter(p => {
    if (category === "all") return true;
    return p.category === category;
  });

  let html = "";
  filtered.forEach(p => {
    html += `
      <div class="prompt-card">
        <div>
          <div class="prompt-card-top">
            <span class="chip chip-purple">${escapeHtml(p.categoryLabel)}</span>
            <button class="btn btn-xs btn-primary" onclick="copyPromptText('${p.id}')">
              Copy Prompt
            </button>
          </div>
          <h3 class="prompt-title">${escapeHtml(p.title)}</h3>
          <p class="prompt-description">${escapeHtml(p.description)}</p>
        </div>
        <div>
          <pre class="prompt-content-code" id="prompt-text-${p.id}">${escapeHtml(p.prompt)}</pre>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function copyPromptText(promptId) {
  const p = PROMPTS_DATABASE.find(item => item.id === promptId);
  if (p) {
    copyTextToClipboard(p.prompt, `"${p.title}" prompt copied! Paste into NotebookLM.`);
  }
}

// ==========================================================================
// 15. BEFORE & AFTER COMPARISON
// ==========================================================================

function initComparisonSection() {
  const textarea = document.getElementById("student-reflection-notes");
  const saveBtn = document.getElementById("btn-save-reflection");

  if (textarea) {
    const saved = localStorage.getItem(AppState.KEYS.COMPARISON_NOTES);
    if (saved) textarea.value = saved;
  }

  if (saveBtn && textarea) {
    saveBtn.addEventListener("click", () => {
      localStorage.setItem(AppState.KEYS.COMPARISON_NOTES, textarea.value.trim());
      showToast("Student reflection notes saved!", "success");
    });
  }
}

// Helper: Escape HTML
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ==========================================================================
// 16. GLOBAL INITIALIZATION
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize mobile navigation & routing
  initMobileNavigation();

  // 2. Initialize upload section
  initUploadSection();

  // 3. Initialize study guide section
  initStudyGuideSection();

  // 4. Initialize summary section
  initSummarySection();

  // 5. Initialize quiz section
  initQuizSection();

  // 6. Initialize FAQ section
  initFAQSection();

  // 7. Initialize audio section
  initAudioSection();

  // 8. Initialize timeline section
  initTimelineSection();

  // 9. Initialize accuracy section
  initAccuracySection();

  // 10. Initialize prompt library
  initPromptLibrary();

  // 11. Initialize comparison section
  initComparisonSection();

  // 12. Update dashboard statistics & recent cards
  updateDashboardMetrics();

  console.log("Smart Study Assistant (Capstone 41) initialized successfully.");
});
