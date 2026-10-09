<?php
header('Content-Type: application/json; charset=utf-8');

/* =====================================================================
   CONFIG
   ---------------------------------------------------------------------
   Sender   : newquery.business@gmail.com   (Gmail SMTP se bhejega)
   Receiver : orientalcertification@gmail.com

   IMPORTANT: Gmail ka normal password kaam nahi karega.
   newquery.business@gmail.com me:
     Google Account > Security > 2-Step Verification ON karo
     > App passwords > ek 16-digit password banao
   Wo password neeche SMTP_PASS me daalo (spaces hata kar).
   ===================================================================== */
$SMTP_HOST  = 'smtp.gmail.com';
$SMTP_PORT  = 465;                                  // SSL
$SMTP_USER  = 'newquery.business@gmail.com';        // sender
$SMTP_PASS  = 'egxosajnprnyvbyi';         // <-- yahan App Password daalo

$TO_EMAIL   = 'orientalcertification@gmail.com';    // enquiry yahan aayegi
$FROM_EMAIL = 'newquery.business@gmail.com';
$SITE_NAME  = 'QMSISO';
$BRAND_NAVY = '#0b1f3a';
$BRAND_GOLD = '#f2a51a';

date_default_timezone_set('Asia/Kolkata');

function respond($ok, $msg = '', $code = 200) {
    http_response_code($code);
    echo json_encode(['success' => $ok, 'error' => $ok ? null : $msg]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Invalid request', 405);
}

/* single-line field: tags hatao, newline hatao (header injection se bachne ke liye) */
function line($key, $default = '') {
    $v = isset($_POST[$key]) ? (string)$_POST[$key] : '';
    $v = trim(strip_tags($v));
    $v = preg_replace('/[\r\n]+/', ' ', $v);
    $v = mb_substr($v, 0, 200);
    return $v !== '' ? $v : $default;
}

function h($s) { return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); }

$formName    = line('form_name', 'Website Enquiry');
$name        = line('name');
$business    = line('business', 'Not Provided');
$phone       = line('phone');
$email       = line('email');
$certificate = line('certificate', 'Not Selected');

$message = isset($_POST['message']) ? trim(strip_tags((string)$_POST['message'])) : '';
$message = mb_substr($message, 0, 3000);
if ($message === '') $message = 'No additional message';

if ($name === '' || $phone === '') {
    respond(false, 'Name and phone are required', 422);
}

$validEmail = filter_var($email, FILTER_VALIDATE_EMAIL);
$emailText  = $validEmail ? $email : 'Not Provided';
$received   = date('d M Y, h:i A') . ' (IST)';
$ip         = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '-';

/* ---------------- SUBJECT ---------------- */
$subjectPlain = "New Enquiry: $formName - $name";
$subject = '=?UTF-8?B?' . base64_encode($subjectPlain) . '?=';

/* ---------------- PLAIN TEXT VERSION ---------------- */
$text  = "NEW ENQUIRY - $SITE_NAME\n";
$text .= "==============================\n\n";
$text .= "Form        : $formName\n";
$text .= "Name        : $name\n";
$text .= "Business    : $business\n";
$text .= "Phone       : $phone\n";
$text .= "Email       : $emailText\n";
$text .= "Certificate : $certificate\n";
$text .= "Received    : $received\n\n";
$text .= "Message:\n$message\n\n";
$text .= "------------------------------\n";
$text .= "Reply to this email to respond to the customer.\n";

/* ---------------- HTML VERSION ---------------- */
function row($label, $value, $last = false) {
    $border = $last ? '' : 'border-bottom:1px solid #e8edf3;';
    return '<tr>'
        . '<td style="padding:12px 16px;' . $border . 'width:36%;font-size:13px;color:#6b7a90;font-weight:600;text-transform:uppercase;letter-spacing:.4px;vertical-align:top;">' . h($label) . '</td>'
        . '<td style="padding:12px 16px;' . $border . 'font-size:15px;color:#26364f;vertical-align:top;">' . $value . '</td>'
        . '</tr>';
}

$phoneHtml = '<a href="tel:' . h(preg_replace('/[^0-9+]/', '', $phone)) . '" style="color:#0b1f3a;text-decoration:none;font-weight:600;">' . h($phone) . '</a>';
$emailHtml = $validEmail
    ? '<a href="mailto:' . h($email) . '" style="color:#0b1f3a;text-decoration:none;font-weight:600;">' . h($email) . '</a>'
    : '<span style="color:#9aa6b6;">Not Provided</span>';

$rows  = row('Name', '<strong>' . h($name) . '</strong>');
$rows .= row('Business', h($business));
$rows .= row('Phone', $phoneHtml);
$rows .= row('Email', $emailHtml);
$rows .= row('Certificate', '<span style="display:inline-block;background:#fff4dc;color:#a96a00;border:1px solid #f2a51a;border-radius:20px;padding:3px 12px;font-size:13px;font-weight:600;">' . h($certificate) . '</span>');
$rows .= row('Source', h($formName));
$rows .= row('Received', h($received), true);

$replyBtn = $validEmail
    ? '<a href="mailto:' . h($email) . '?subject=' . rawurlencode('Re: Your enquiry - ' . $SITE_NAME) . '" style="display:inline-block;background:' . $BRAND_GOLD . ';color:' . $BRAND_NAVY . ';text-decoration:none;font-weight:700;font-size:14px;padding:12px 26px;border-radius:6px;margin:0 6px 8px;">Reply by Email</a>'
    : '';
$callBtn = '<a href="tel:' . h(preg_replace('/[^0-9+]/', '', $phone)) . '" style="display:inline-block;background:' . $BRAND_NAVY . ';color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 26px;border-radius:6px;margin:0 6px 8px;">Call Customer</a>';

$html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>'
. '<body style="margin:0;padding:0;background:#eef2f7;font-family:Arial,Helvetica,sans-serif;">'
. '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f7;padding:28px 12px;"><tr><td align="center">'
. '<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 18px rgba(11,31,58,.10);">'

/* header */
. '<tr><td style="background:' . $BRAND_NAVY . ';padding:26px 30px;border-bottom:4px solid ' . $BRAND_GOLD . ';">'
. '<div style="font-size:24px;font-weight:800;color:#ffffff;letter-spacing:1px;">' . h($SITE_NAME) . '</div>'
. '<div style="font-size:12px;color:' . $BRAND_GOLD . ';letter-spacing:2px;margin-top:4px;text-transform:uppercase;">ISO Certification Consultants</div>'
. '</td></tr>'

/* title */
. '<tr><td style="padding:28px 30px 8px;">'
. '<div style="font-size:12px;color:#6b7a90;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;">New Website Enquiry</div>'
. '<div style="font-size:22px;color:' . $BRAND_NAVY . ';font-weight:700;margin-top:6px;">' . h($name) . ' has requested a consultation</div>'
. '<div style="font-size:14px;color:#6b7a90;margin-top:8px;line-height:1.6;">A new enquiry was submitted through the website. Details are below.</div>'
. '</td></tr>'

/* details */
. '<tr><td style="padding:18px 30px 6px;">'
. '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8edf3;border-radius:8px;border-collapse:separate;overflow:hidden;">' . $rows . '</table>'
. '</td></tr>'

/* message */
. '<tr><td style="padding:16px 30px 6px;">'
. '<div style="font-size:13px;color:#6b7a90;font-weight:700;text-transform:uppercase;letter-spacing:.4px;margin-bottom:8px;">Message</div>'
. '<div style="background:#f7f9fc;border-left:4px solid ' . $BRAND_GOLD . ';border-radius:4px;padding:16px 18px;font-size:15px;line-height:1.7;color:#26364f;">' . nl2br(h($message)) . '</div>'
. '</td></tr>'

/* buttons */
. '<tr><td align="center" style="padding:26px 30px 8px;">' . $replyBtn . $callBtn . '</td></tr>'

/* footer */
. '<tr><td style="padding:22px 30px;background:#f7f9fc;border-top:1px solid #e8edf3;text-align:center;">'
. '<div style="font-size:12px;color:#8793a5;line-height:1.7;">This is an automated notification from the ' . h($SITE_NAME) . ' website.<br>You can reply directly to this email to reach the customer.</div>'
. '<div style="font-size:11px;color:#b0b9c6;margin-top:10px;">&copy; ' . date('Y') . ' ' . h($SITE_NAME) . '. All rights reserved.</div>'
. '</td></tr>'

. '</table></td></tr></table></body></html>';

/* ---------------- MIME (multipart/alternative) ---------------- */
$boundary = 'qmsiso_' . md5(uniqid('', true));
$fromName = '=?UTF-8?B?' . base64_encode($SITE_NAME . ' Website') . '?=';

$headers  = "From: $fromName <$FROM_EMAIL>\r\n";
$headers .= "To: $TO_EMAIL\r\n";
if ($validEmail) {
    $replyName = '=?UTF-8?B?' . base64_encode($name) . '?=';
    $headers .= "Reply-To: $replyName <$email>\r\n";
}
$headers .= "Subject: $subject\r\n";
$headers .= "Date: " . date('r') . "\r\n";
$headers .= "Message-ID: <" . md5(uniqid('', true)) . "@qmsiso>\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/alternative; boundary=\"$boundary\"\r\n";

$mime  = "--$boundary\r\n";
$mime .= "Content-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n";
$mime .= chunk_split(base64_encode($text)) . "\r\n";
$mime .= "--$boundary\r\n";
$mime .= "Content-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n";
$mime .= chunk_split(base64_encode($html)) . "\r\n";
$mime .= "--$boundary--\r\n";

/* ---------------- SMTP SENDER (Gmail) ---------------- */
function smtp_send($host, $port, $user, $pass, $from, $to, $headers, $body) {
    $errno = 0; $errstr = '';
    $fp = @stream_socket_client("ssl://$host:$port", $errno, $errstr, 15);
    if (!$fp) return false;
    stream_set_timeout($fp, 15);

    $read = function () use ($fp) {
        $data = '';
        while (($l = fgets($fp, 515)) !== false) {
            $data .= $l;
            if (strlen($l) < 4 || $l[3] === ' ') break;
        }
        return $data;
    };
    $cmd = function ($c, $expect) use ($fp, $read) {
        fwrite($fp, $c . "\r\n");
        $r = $read();
        return strpos($r, (string)$expect) === 0;
    };

    $ok = (strpos($read(), '220') === 0)
       && $cmd('EHLO qmsiso', 250)
       && $cmd('AUTH LOGIN', 334)
       && $cmd(base64_encode($user), 334)
       && $cmd(base64_encode($pass), 235)
       && $cmd("MAIL FROM:<$from>", 250)
       && $cmd("RCPT TO:<$to>", 250)
       && $cmd('DATA', 354);

    if ($ok) {
        $data = $headers . "\r\n" . $body;
        $data = preg_replace('/(?<!\r)\n/', "\r\n", $data);
        $data = preg_replace('/^\./m', '..', $data);
        fwrite($fp, $data . "\r\n.\r\n");
        $ok = strpos($read(), '250') === 0;
    }
    @fwrite($fp, "QUIT\r\n");
    @fclose($fp);
    return $ok;
}

$sent = false;
if ($SMTP_PASS !== '' && $SMTP_PASS !== 'YOUR_16_DIGIT_APP_PASSWORD') {
    $sent = smtp_send($SMTP_HOST, $SMTP_PORT, $SMTP_USER, $SMTP_PASS, $FROM_EMAIL, $TO_EMAIL, $headers, $mime);
}

/* fallback: agar SMTP fail ho to normal PHP mail() try karo */
if (!$sent) {
    $mailHeaders = preg_replace('/^(To|Subject): .*\r\n/m', '', $headers);
    $sent = @mail($TO_EMAIL, $subject, $mime, $mailHeaders, '-f' . $FROM_EMAIL);
}

if ($sent) {
    respond(true);
}
respond(false, 'Mail could not be sent', 500);