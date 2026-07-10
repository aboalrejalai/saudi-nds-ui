"use client"

import * as React from "react"
import {
  Attachment,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
  AttachmentTrigger,
} from "@/registry/dga/ui/beta/attachment"
import {
  BubbleGroup,
  Bubble,
  BubbleContent,
  BubbleReactions,
} from "@/registry/dga/ui/beta/bubble"
import {
  MessageGroup,
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from "@/registry/dga/ui/beta/message"
import {
  Marker,
  MarkerContent,
  MarkerIcon,
} from "@/registry/dga/ui/beta/marker"
import {
  MessageScroller,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerViewport,
  MessageScrollerButton,
} from "@/registry/dga/ui/beta/message-scroller"
import { Toaster } from "@/registry/dga/ui/beta/toaster"
import { useToast } from "@/registry/dga/ui/beta/use-toast"
import { Typography } from "@/registry/dga/ui/beta/typography"
import { Button } from "@/registry/dga/ui/button"
import { DirectionToggle } from "@/components/docs/direction-toggle"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  File01Icon,
  Download01Icon,
  Cancel01Icon,
  Delete01Icon,
  TickDouble01Icon,
  AlertCircleIcon,
  SentIcon,
  DocumentAttachmentIcon,
  AiCloudIcon,
  Message01Icon,
  Calendar01Icon,
  Notification03Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons"

export default function BetaPreviewPage() {
  const { toast } = useToast()
  
  const [messages, setMessages] = React.useState([
    {
      id: 1,
      sender: "bot",
      content: "مرحباً بك! أنا مساعدك الذكي المطور بالهوية الوطنية السعودية. كيف يمكنني مساعدتك اليوم؟ 🇸🇦",
      timestamp: "10:30 ص",
      variant: "tinted" as const,
      align: "start" as const,
    },
    {
      id: 2,
      sender: "user",
      content: "أهلاً بك، أود تجربة رفع ملفاتك الجديدة واستعراض الرسائل وعناصر واجهة المستخدم المطورة.",
      timestamp: "10:31 ص",
      variant: "default" as const,
      align: "end" as const,
    }
  ])

  const [inputText, setInputText] = React.useState("")
  const [attachments, setAttachments] = React.useState([
    {
      id: "file-1",
      title: "دليل الهوية البصرية.pdf",
      description: "4.2 MB • مكتمل",
      state: "done" as const,
      type: "pdf"
    },
    {
      id: "file-2",
      title: "رؤية_السعودية_2030.docx",
      description: "1.8 MB • جاري المعالجة...",
      state: "processing" as const,
      type: "doc"
    },
    {
      id: "file-3",
      title: "تقرير_الربع_الأول.xlsx",
      description: "فشل الرفع • حاول مجدداً",
      state: "error" as const,
      type: "xls"
    }
  ])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const newMsg = {
      id: Date.now(),
      sender: "user",
      content: inputText,
      timestamp: new Date().toLocaleTimeString("ar-SA", { hour: '2-digit', minute: '2-digit' }),
      variant: "default" as const,
      align: "end" as const,
    }

    setMessages((prev) => [...prev, newMsg])
    setInputText("")

    // Trigger toast indicating sending
    toast({
      title: "تم إرسال الرسالة",
      description: "جاري توليد الرد من الذكاء الاصطناعي...",
      variant: "default",
    })

    // Simulating Bot Response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          content: `تلقيت رسالتك: "${inputText}". هذه الفقاعة تعمل الآن داخل حاوية التمرير التلقائي الذكي (MessageScroller).`,
          timestamp: new Date().toLocaleTimeString("ar-SA", { hour: '2-digit', minute: '2-digit' }),
          variant: "tinted" as const,
          align: "start" as const,
        }
      ])
      
      toast({
        title: "رد جديد",
        description: "تلقيت رداً جديداً من المساعد الرقمي.",
        variant: "success",
      })
    }, 1000)
  }

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((att) => att.id !== id))
    toast({
      title: "تم حذف الملف",
      description: "تمت إزالة المرفق بنجاح.",
      variant: "default",
    })
  }

  const retryAttachment = (id: string) => {
    setAttachments((prev) =>
      prev.map((att) =>
        att.id === id ? { ...att, state: "processing", description: "جاري رفع الملف..." } : att
      )
    )

    setTimeout(() => {
      setAttachments((prev) =>
        prev.map((att) =>
          att.id === id ? { ...att, state: "done", description: "1.2 MB • مكتمل" } : att
        )
      )
      toast({
        title: "اكتمل الرفع",
        description: "تم رفع الملف بنجاح إلى الخادم.",
        variant: "success",
      })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-[#FCFCFD] dark:bg-[#111927] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#E5E7EB] dark:border-[#1F2A37] pb-6 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[#111927] dark:text-[#FCFCFD] tracking-tight">
              معاينة المكونات التجريبية (Beta)
            </h1>
            <p className="mt-2 text-sm text-[#4B5563] dark:text-[#9CA3AF]">
              تم تفعيل كافة المكونات السبعة: <code className="bg-[#F3F4F6] dark:bg-[#1F2A37] px-1 rounded text-[#1B8354] font-semibold">Attachment</code>, <code className="bg-[#F3F4F6] dark:bg-[#1F2A37] px-1 rounded text-[#1B8354] font-semibold">Bubble</code>, <code className="bg-[#F3F4F6] dark:bg-[#1F2A37] px-1 rounded text-[#1B8354] font-semibold">Message</code>, <code className="bg-[#F3F4F6] dark:bg-[#1F2A37] px-1 rounded text-[#1B8354] font-semibold">Marker</code>, <code className="bg-[#F3F4F6] dark:bg-[#1F2A37] px-1 rounded text-[#1B8354] font-semibold">MessageScroller</code>, <code className="bg-[#F3F4F6] dark:bg-[#1F2A37] px-1 rounded text-[#1B8354] font-semibold">Toast</code>, <code className="bg-[#F3F4F6] dark:bg-[#1F2A37] px-1 rounded text-[#1B8354] font-semibold">Typography</code>.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#4B5563] dark:text-[#9CA3AF]">تغيير الاتجاه:</span>
            <DirectionToggle />
          </div>
        </div>

        {/* Dynamic Interactive Demo: Chat Interface with MessageScroller */}
        <section className="bg-white dark:bg-[#1C2536] rounded-2xl border border-[#E5E7EB] dark:border-[#1F2A37] shadow-sm overflow-hidden flex flex-col h-[650px]">
          <div className="bg-[#F9FAFB] dark:bg-[#121824] px-6 py-4 border-b border-[#E5E7EB] dark:border-[#1F2A37] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-[#E8F5E9] dark:bg-[#1B8354]/20 flex items-center justify-center text-[#1B8354]">
                <HugeiconsIcon icon={AiCloudIcon} className="size-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#111927] dark:text-[#FCFCFD] text-sm">مساعد الهوية الوطنية الرقمي</h3>
                <span className="text-xs text-[#069454] font-semibold flex items-center gap-1">🟢 متصل الآن (تجربة التمرير الذكي)</span>
              </div>
            </div>
          </div>

          {/* MessageScroller Viewport */}
          <MessageScroller className="flex-1 min-h-0">
            <MessageScrollerViewport className="p-6">
              <MessageScrollerContent>
                <MessageGroup>
                  
                  {/* Time separation Marker */}
                  <Marker variant="separator">
                    <MarkerIcon>
                      <HugeiconsIcon icon={Calendar01Icon} className="size-3.5" />
                    </MarkerIcon>
                    <MarkerContent>اليوم، 10 يوليو 2026</MarkerContent>
                  </Marker>

                  {messages.map((msg) => (
                    <MessageScrollerItem key={msg.id} scrollAnchor={true}>
                      <Message align={msg.align}>
                        <MessageAvatar className="text-xs font-bold text-white bg-[#1B8354] dark:bg-[#166A45]">
                          {msg.sender === "bot" ? "آلي" : "أنا"}
                        </MessageAvatar>
                        <MessageContent>
                          <MessageHeader>
                            <span>{msg.sender === "bot" ? "مساعد الهوية الوطنية" : "المستخدم"}</span>
                            <span className="mx-1.5 text-muted-foreground/50">•</span>
                            <span>{msg.timestamp}</span>
                          </MessageHeader>
                          
                          <Bubble variant={msg.variant}>
                            <BubbleContent>
                              <p>{msg.content}</p>
                            </BubbleContent>
                            {msg.sender === "bot" && (
                              <BubbleReactions side="bottom" align="start">
                                <button className="hover:scale-125 transition-transform">👍</button>
                                <button className="hover:scale-125 transition-transform">🇸🇦</button>
                                <button className="hover:scale-125 transition-transform">❤️</button>
                              </BubbleReactions>
                            )}
                          </Bubble>

                          <MessageFooter>
                            <HugeiconsIcon icon={TickDouble01Icon} className="size-3 text-[#1B8354] me-1" />
                            <span>تم التسليم</span>
                          </MessageFooter>
                        </MessageContent>
                      </Message>
                    </MessageScrollerItem>
                  ))}

                  {/* System status message */}
                  <MessageScrollerItem>
                    <Marker variant="border" side="start">
                      <MarkerIcon>
                        <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-3.5 text-[#1B8354]" />
                      </MarkerIcon>
                      <MarkerContent>
                        تم التحقق من هويتك الرقمية عبر النفاذ الوطني الموحد. <a href="#">عرض الشهادة</a>
                      </MarkerContent>
                    </Marker>
                  </MessageScrollerItem>

                </MessageGroup>
              </MessageScrollerContent>
            </MessageScrollerViewport>
            {/* Smooth Floating Scroll Button */}
            <MessageScrollerButton />
          </MessageScroller>

          {/* File Attachments Area in Input Panel */}
          {attachments.length > 0 && (
            <div className="px-6 py-3 bg-[#FCFCFD] dark:bg-[#121824] border-t border-[#E5E7EB] dark:border-[#1F2A37]">
              <AttachmentGroup>
                {attachments.map((att) => (
                  <Attachment key={att.id} state={att.state} size="sm">
                    <AttachmentMedia variant="icon">
                      <HugeiconsIcon icon={File01Icon} className="size-4" />
                    </AttachmentMedia>
                    <AttachmentContent>
                      <AttachmentTitle>{att.title}</AttachmentTitle>
                      <AttachmentDescription>{att.description}</AttachmentDescription>
                    </AttachmentContent>
                    <AttachmentActions>
                      {att.state === "error" && (
                        <AttachmentAction onClick={() => retryAttachment(att.id)} size="icon-xs" title="إعادة المحاولة">
                          <HugeiconsIcon icon={SentIcon} className="size-3 text-[#1B8354]" />
                        </AttachmentAction>
                      )}
                      <AttachmentAction onClick={() => removeAttachment(att.id)} size="icon-xs" title="حذف">
                        <HugeiconsIcon icon={Delete01Icon} className="size-3 text-destructive" />
                      </AttachmentAction>
                    </AttachmentActions>
                  </Attachment>
                ))}
              </AttachmentGroup>
            </div>
          )}

          {/* Message Input Form */}
          <form onSubmit={handleSendMessage} className="p-4 bg-[#F9FAFB] dark:bg-[#121824] border-t border-[#E5E7EB] dark:border-[#1F2A37] flex items-center gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="اكتب رسالتك هنا..."
                className="w-full bg-white dark:bg-[#1C2536] border border-[#E5E7EB] dark:border-[#1F2A37] rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B8354] focus:border-transparent dark:text-white"
              />
            </div>
            <Button type="submit" className="bg-[#1B8354] hover:bg-[#166A45] text-white rounded-xl py-3 px-6 text-sm font-semibold transition-colors flex items-center gap-2">
              <span>إرسال</span>
              <HugeiconsIcon icon={SentIcon} className="size-4 rtl:rotate-180" />
            </Button>
          </form>
        </section>

        {/* Actionable Grid for Toast triggers & Typography spec */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Toast Triggers Panel */}
          <div className="bg-white dark:bg-[#1C2536] rounded-2xl border border-[#E5E7EB] dark:border-[#1F2A37] p-6 space-y-6">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={Notification03Icon} className="size-5 text-[#1B8354]" />
              <h3 className="font-bold text-lg text-[#111927] dark:text-[#FCFCFD]">تنبيهات النظام التفاعلية (Toast Triggers)</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              اضغط على الأزرار بالأسفل لتجربة التنبيهات الكلاسيكية (Radix Toast) المخصصة بجمالية الهوية الوطنية السعودية.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                className="hover:border-[#1B8354] hover:text-[#1B8354]"
                onClick={() =>
                  toast({
                    title: "تنبيه افتراضي",
                    description: "تم الاتصال بالخادم الوطني الموحد بنجاح.",
                    variant: "default",
                  })
                }
              >
                تنبيه افتراضي
              </Button>
              
              <Button
                variant="outline"
                className="hover:border-[#079455] hover:text-[#067647]"
                onClick={() =>
                  toast({
                    title: "عملية ناجحة",
                    description: "تم تحديث بيانات ملفك الشخصي بنجاح.",
                    variant: "success",
                  })
                }
              >
                تنبيه نجاح
              </Button>

              <Button
                variant="outline"
                className="hover:border-destructive hover:text-destructive"
                onClick={() =>
                  toast({
                    title: "خطأ في المعالجة",
                    description: "فشل التحقق من الجلسة الحالية، يرجى تسجيل الدخول.",
                    variant: "destructive",
                  })
                }
              >
                تنبيه خطأ
              </Button>
            </div>
          </div>

          {/* Typography Spec Panel */}
          <div className="bg-white dark:bg-[#1C2536] rounded-2xl border border-[#E5E7EB] dark:border-[#1F2A37] p-6 space-y-6">
            <h3 className="font-bold text-lg text-[#111927] dark:text-[#FCFCFD]">نظام النصوص المعتمد (DGA Typography)</h3>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              <div>
                <Typography variant="muted" className="block mb-1">العنوان الأول (H1):</Typography>
                <Typography variant="h1">هيئة الحكومة الرقمية</Typography>
              </div>

              <div className="border-t border-[#E5E7EB] dark:border-[#1F2A37] pt-2">
                <Typography variant="muted" className="block mb-1">العنوان الثاني (H2):</Typography>
                <Typography variant="h2">الخدمات الرقمية المشتركة</Typography>
              </div>

              <div className="border-t border-[#E5E7EB] dark:border-[#1F2A37] pt-2">
                <Typography variant="muted" className="block mb-1">العنوان الثالث (H3):</Typography>
                <Typography variant="h3">رؤية السعودية 2030</Typography>
              </div>

              <div className="border-t border-[#E5E7EB] dark:border-[#1F2A37] pt-2">
                <Typography variant="muted" className="block mb-1">الفقرة الافتراضية (Paragraph):</Typography>
                <Typography variant="p">
                  تهدف الهوية الوطنية الرقمية إلى تسهيل وتقديم تجربة استخدام مرنة وموحدة لكافة المواطنين والمقيمين في المملكة العربية السعودية.
                </Typography>
              </div>

              <div className="border-t border-[#E5E7EB] dark:border-[#1F2A37] pt-2">
                <Typography variant="muted" className="block mb-1">نص مقتبس (Blockquote):</Typography>
                <Typography variant="blockquote">
                  نحن نعمل على تمكين الجهات الحكومية رقمياً لتقديم خدمات ذات كفاءة وموثوقية عالية.
                </Typography>
              </div>

              <div className="border-t border-[#E5E7EB] dark:border-[#1F2A37] pt-2">
                <Typography variant="muted" className="block mb-1">كود مدمج (Inline Code):</Typography>
                <Typography variant="p">
                  لتشغيل الحاوية البرمجية، استخدم الأمر <Typography variant="inlineCode">npm run dev</Typography> في منفذ الأوامر.
                </Typography>
              </div>

              <div className="border-t border-[#E5E7EB] dark:border-[#1F2A37] pt-2">
                <Typography variant="muted" className="block mb-1">نص قيادي (Lead Text):</Typography>
                <Typography variant="lead">هذا نص عريض ومميز للفقرات القيادية الرئيسية.</Typography>
              </div>
            </div>
          </div>

        </div>

      </div>
      
      {/* Toast Render Area */}
      <Toaster />
    </div>
  )
}
